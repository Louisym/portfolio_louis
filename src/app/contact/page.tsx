import { Contact } from "@/components/Contact";
import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "联系 | Louis",
  description:
    "我是刘一民（Louis），USC ECE 研究生。一个对大模型微调/对齐 与 Agentic RAG 系统，关注效率、可靠性与工程落地的AI爱好者。",
};

export default function Projects() {
  return (
    <Container>
      <span className="text-4xl">✉️</span>
      <Heading className="font-black mb-2">联系我</Heading>
      <Paragraph className="mb-10 max-w-xl">
        有任何问题、事务与我交流，请填写这份联系表单。我会尽快给予回复！
      </Paragraph>
      <Contact />
    </Container>
  );
}
