import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// 用于服务端API调用的客户端
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// 用于客户端的公开客户端（暂时注释，专注API功能）
// export const supabase = createClient(
//   supabaseUrl,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
//   {
//     auth: {
//       persistSession: true
//     }
//   }
// );

// 数据库类型定义
export interface ChatMessage {
  id: string;
  session_id: string;
  message: string;
  role: 'user' | 'assistant';
  created_at: string;
  metadata?: Record<string, any>;
}

export interface ChatSession {
  id: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
  title?: string;
}