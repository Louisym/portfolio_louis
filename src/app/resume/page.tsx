import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { WorkHistory } from "@/components/WorkHistory";
import { DownloadButton } from "@/components/DownloadButton";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-4xl">💼</span>
          <Heading className="font-black">工作经历</Heading>
        </div>
        <DownloadButton />
      </div>
      <Paragraph className="max-w-xl mt-4">
      我是刘一民（Louis），USC ECE 研究生。一个对大模型微调/对齐 与 Agentic RAG 系统，关注效率、可靠性与工程落地的AI爱好者。
      </Paragraph>
      <WorkHistory />
    </Container>
  );
}
