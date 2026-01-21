import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { WorkHistory } from "@/components/WorkHistory";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <span className="text-4xl">💼</span>
      <Heading className="font-black">Work History</Heading>
      <Paragraph className="max-w-xl mt-4">
      我是刘一民（Louis），USC ECE 研究生。一个对大模型微调/对齐 与 Agentic RAG 系统，关注效率、可靠性与工程落地的AI爱好者。
      </Paragraph>
      <WorkHistory />
    </Container>
  );
}
