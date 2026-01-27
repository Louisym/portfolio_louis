import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabaseAdmin } from '../../../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json();

    if (!message) {
      return NextResponse.json({ error: '消息不能为空' }, { status: 400 });
    }

    // 检查环境变量
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API密钥未配置' }, { status: 500 });
    }

    let currentSessionId = sessionId;

    // 如果没有提供sessionId，创建新的会话
    if (!currentSessionId) {
      const { data: newSession, error: sessionError } = await supabaseAdmin
        .from('chat_sessions')
        .insert({
          id: uuidv4(),
          title: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
        })
        .select()
        .single();

      if (sessionError) {
        console.error('创建会话失败:', sessionError);
        return NextResponse.json({ error: '创建会话失败' }, { status: 500 });
      }

      currentSessionId = newSession.id;
    }

    // 保存用户消息到数据库
    const { error: userMessageError } = await supabaseAdmin
      .from('chat_messages')
      .insert({
        session_id: currentSessionId,
        message: message,
        role: 'user',
      });

    if (userMessageError) {
      console.error('保存用户消息失败:', userMessageError);
      return NextResponse.json({ error: '保存消息失败' }, { status: 500 });
    }

    // 获取聊天历史（最近10条消息）
    const { data: chatHistory, error: historyError } = await supabaseAdmin
      .from('chat_messages')
      .select('message, role')
      .eq('session_id', currentSessionId)
      .order('created_at', { ascending: true })
      .limit(10);

    if (historyError) {
      console.error('获取聊天历史失败:', historyError);
    }

    // 构建OpenAI对话上下文
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `你是Louis（刘一民）的个人助理AI。你需要帮助访客了解Louis的背景、技能和项目经验。

Louis的背景信息：
- USC ECE研究生，专注大模型微调/对齐与Agentic RAG系统
- 在USC E2S2C Research Group担任Research Assistant
- 曾在ABB担任DevOps Intern
- 正在Stanford/Harvard学习现代软件开发
- 活跃的开源贡献者

技术栈：
- 机器学习：LLM微调、推理优化、系统化评估
- 后端开发：Python、FastAPI、数据库设计
- 前端开发：React、Next.js、Tailwind CSS
- 云服务：AWS、Azure、容器化部署
- 工具链：Git、CI/CD、自动化脚本

请用友好、专业的语调回答访客的问题。如果问题超出了Louis的专业领域，可以诚实地说不太了解，但可以提供一般性的建议。回答时要具体、有帮助，并突出Louis的相关经验。`
      },
      ...(chatHistory || []).map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.message
      }))
    ];

    // 调用OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // 使用更经济的模型
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content || '抱歉，我无法生成回复。';

    // 保存AI回复到数据库
    const { error: aiMessageError } = await supabaseAdmin
      .from('chat_messages')
      .insert({
        session_id: currentSessionId,
        message: aiResponse,
        role: 'assistant',
        metadata: {
          model: completion.model,
          tokens_used: completion.usage?.total_tokens || 0,
        }
      });

    if (aiMessageError) {
      console.error('保存AI回复失败:', aiMessageError);
    }

    return NextResponse.json({
      message: aiResponse,
      sessionId: currentSessionId,
      usage: completion.usage
    });

  } catch (error) {
    console.error('聊天API错误:', error);
    
    // 详细错误信息用于调试
    let errorMessage = '服务器内部错误，请稍后重试';
    
    if (error instanceof Error) {
      // OpenAI API错误
      if (error.message.includes('API key')) {
        errorMessage = 'OpenAI API密钥配置错误';
      } else if (error.message.includes('quota')) {
        errorMessage = 'OpenAI API配额已用完';
      } else if (error.message.includes('Supabase')) {
        errorMessage = '数据库连接错误';
      } else {
        // 在开发/测试环境显示详细错误
        errorMessage = process.env.NODE_ENV === 'production' 
          ? '服务器内部错误，请稍后重试'
          : `错误: ${error.message}`;
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}