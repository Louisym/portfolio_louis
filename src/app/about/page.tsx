import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { Metadata } from "next";
import Image from "next/image";

import { motion } from "framer-motion";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "关于 | Louis",
  description:
    "我是刘一民（Louis），USC ECE 研究生。一个对大模型微调/对齐 与 Agentic RAG 系统，关注效率、可靠性与工程落地的AI爱好者。",
};

export default function AboutPage() {
  const images = [
    "/images/cs336_github.png",
    "/images/QA_system_UI.png",
    "/images/kserve_pic.png",
    "/images/wandb.png"
  ];
  return (
    <Container>
      <span className="text-4xl">💬</span>
      <Heading className="font-black">关于我</Heading>
      <About />
    </Container>
  );
}
