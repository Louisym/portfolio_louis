import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // 检查环境变量
    const hasOpenAI = !!process.env.OPENAI_API_KEY;
    const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
    const hasSupabaseKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

    // 不显示实际密钥，只显示是否存在
    const debug = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      configs: {
        openai_configured: hasOpenAI,
        openai_key_prefix: hasOpenAI ? process.env.OPENAI_API_KEY?.substring(0, 7) + '...' : 'not_set',
        supabase_url_configured: hasSupabaseUrl,
        supabase_url: hasSupabaseUrl ? process.env.NEXT_PUBLIC_SUPABASE_URL : 'not_set',
        supabase_key_configured: hasSupabaseKey,
        supabase_key_prefix: hasSupabaseKey ? 'eyJ...' : 'not_set',
      }
    };

    // 测试Supabase连接
    if (hasSupabaseUrl && hasSupabaseKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        
        // 简单测试查询
        const { data, error } = await supabase.from('chat_sessions').select('count').limit(1);
        debug.supabase_test = {
          connection: error ? 'failed' : 'success',
          error: error?.message || null
        };
      } catch (err) {
        debug.supabase_test = {
          connection: 'failed',
          error: (err as Error).message
        };
      }
    }

    return NextResponse.json(debug);

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Debug endpoint failed',
        message: (error as Error).message 
      },
      { status: 500 }
    );
  }
}