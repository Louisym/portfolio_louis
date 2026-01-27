import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI助理 | Louis",
  description: "与Louis的AI助理聊天，了解他的技能、项目经验和职业背景。",
};

export default function ChatPage() {
  return (
    <Container>
      <span className="text-4xl">🤖</span>
      <Heading className="font-black">AI助理</Heading>
      <Paragraph className="max-w-xl mt-4 mb-8">
        有什么关于我的问题吗？我的AI助理可以帮你了解我的技能、项目经验、职业背景等信息。
        现在AI助理已经移到了右下角的悬浮窗中，你可以在任何页面点击机器人图标与我对话！
      </Paragraph>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">💡 你可以问我：</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• "Louis有哪些技术技能？"</li>
          <li>• "介绍一下Louis的项目经验"</li>
          <li>• "Louis的职业背景是什么？"</li>
          <li>• "Louis在哪些领域有专长？"</li>
          <li>• "如何联系Louis？"</li>
        </ul>
      </div>
    </Container>
  );
}