import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <span className="text-4xl">👋</span>
      <Heading className="font-black">你好！你可以叫我Louis！</Heading>
      <Paragraph className="max-w-xl mt-4">
        我是一名AI爱好者，热衷于学习、了解AI算法研究、AI开发工程！希望致力于：LLM post-training、Agent以及AI Engineering的工作。
      </Paragraph>
      <Paragraph className="max-w-xl mt-4">
        我正在做的事：专注于把【大模型应用落地】到真实场景，做出【可上线的 AI 系统】；
        以及研究【LLM 训练与推理系统】：从 tokenizer/Transformer 到对齐训练与推理加速。
        同时，我也时刻关注AI领域的各种创新、新闻，期待能为AI领域的发展作出贡献！
      </Paragraph>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        What I&apos;ve been working on
      </Heading>
      <Products />
      <TechStack />
    </Container>
  );
}
