import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // 验证必填字段
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '所有字段都是必填的' },
        { status: 400 }
      );
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '请输入有效的邮箱地址' },
        { status: 400 }
      );
    }

    // 创建邮件传输器
    const transporter = nodemailer.createTransport({
      service: 'gmail', // 或者使用其他邮件服务
      auth: {
        user: process.env.EMAIL_USER, // 你的Gmail地址
        pass: process.env.EMAIL_PASS, // Gmail应用密码
      },
    });

    // 发送邮件给你自己
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, // 接收邮件的地址
      subject: `Portfolio联系表单 - 来自 ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            Portfolio联系表单
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4F46E5; margin-top: 0;">联系信息</h3>
            <p><strong>姓名：</strong> ${name}</p>
            <p><strong>邮箱：</strong> ${email}</p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">消息内容</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px; font-size: 12px; color: #666;">
            <p>此邮件来自你的Portfolio网站联系表单</p>
            <p>发送时间: ${new Date().toLocaleString('zh-CN')}</p>
          </div>
        </div>
      `,
    });

    // 发送确认邮件给联系者
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '感谢您的联系 - Louis Portfolio',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">感谢您的联系！</h2>
          
          <p>尊敬的 ${name}，</p>
          
          <p>感谢您通过我的Portfolio网站与我联系！我已收到您的消息，会尽快回复您。</p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>您的消息内容：</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p>最好的问候，<br>
          刘一民 (Louis)</p>
          
          <div style="margin-top: 30px; padding: 15px; background: #e3f2fd; border-radius: 8px; font-size: 12px; color: #666;">
            <p>这是一封自动回复邮件，请勿直接回复此邮件。如有急事，请直接联系我。</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: '邮件发送成功！感谢您的联系，我会尽快回复。' },
      { status: 200 }
    );

  } catch (error) {
    console.error('邮件发送失败:', error);
    return NextResponse.json(
      { error: '发送失败，请稍后重试或直接发送邮件给我' },
      { status: 500 }
    );
  }
}