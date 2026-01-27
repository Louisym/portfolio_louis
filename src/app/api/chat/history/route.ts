import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../../lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: '会话ID必填' }, { status: 400 });
    }

    // 获取指定会话的聊天历史
    const { data: messages, error } = await supabaseAdmin
      .from('chat_messages')
      .select('id, message, role, created_at, metadata')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('获取聊天历史失败:', error);
      return NextResponse.json({ error: '获取聊天历史失败' }, { status: 500 });
    }

    return NextResponse.json({ messages: messages || [] });

  } catch (error) {
    console.error('聊天历史API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}