"use client";
import React, { useState, useEffect, useRef } from 'react';
import { IconSend, IconLoader2, IconRobot, IconUser } from '@tabler/icons-react';

interface Message {
  id: string;
  message: string;
  role: 'user' | 'assistant';
  created_at: string;
}

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 发送消息
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // 添加用户消息到UI
    const tempUserMessage: Message = {
      id: Date.now().toString(),
      message: userMessage,
      role: 'user',
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, tempUserMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '发送失败');
      }

      // 更新sessionId（如果是新会话）
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
      }

      // 添加AI回复到UI
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        message: data.message,
        role: 'assistant',
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('发送消息失败:', error);
      // 显示错误消息
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        message: '抱歉，发送消息时出现错误。请稍后重试。',
        role: 'assistant',
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理Enter键发送
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 格式化时间
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col h-[600px] bg-white border border-gray-200 rounded-xl shadow-lg">
      {/* 聊天头部 */}
      <div className="flex items-center space-x-3 p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
        <div className="flex items-center space-x-2">
          <IconRobot className="h-8 w-8 text-blue-500" />
          <div>
            <h3 className="font-semibold text-gray-900">Louis AI 助理</h3>
            <p className="text-sm text-gray-500">询问关于Louis的任何问题</p>
          </div>
        </div>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <IconRobot className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">👋 你好！我是Louis的AI助理</p>
            <p className="text-gray-400 text-sm">你可以问我关于Louis的技能、项目经验或职业背景</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              {/* 头像 */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-blue-500'
                    : 'bg-gray-200'
                }`}
              >
                {message.role === 'user' ? (
                  <IconUser className="h-4 w-4 text-white" />
                ) : (
                  <IconRobot className="h-4 w-4 text-gray-600" />
                )}
              </div>

              {/* 消息气泡 */}
              <div
                className={`px-4 py-2 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {formatTime(message.created_at)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* 加载状态 */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <IconRobot className="h-4 w-4 text-gray-600" />
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <IconLoader2 className="h-4 w-4 animate-spin text-gray-600" />
                  <span className="text-sm text-gray-600">正在思考...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入你的问题..."
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className={`p-2 rounded-lg transition-colors ${
              !inputMessage.trim() || isLoading
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <IconSend className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};