import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "项目经历 | Louis",
  description:
    "刘一民（Louis）的项目经历展示，包括AI、机器学习和软件开发相关项目。",
};

export default function Projects() {
  return (
    <Container>
      <span className="text-4xl">⚡</span>
      <Heading className="font-black mb-10">
        我的项目经历
      </Heading>

      <Products />
    </Container>
  );
}
