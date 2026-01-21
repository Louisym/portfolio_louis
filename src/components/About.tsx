"use client";
import { Paragraph } from "@/components/Paragraph";
import Image from "next/image";

import { motion } from "framer-motion";

export default function About() {
  const images = [
    "/images/cs336_github.png",
    "/images/QA_system_UI.png",
    "/images/kserve_pic.png",
    "/images/wandb.png",
  ];
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 my-10">
        {images.map((image, index) => (
          <motion.div
            key={image}
            initial={{
              opacity: 0,
              y: -50,
              rotate: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: index % 2 === 0 ? 3 : -3,
            }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            <Image
              src={image}
              width={200}
              height={400}
              alt="about"
              className="rounded-md object-cover transform rotate-3 shadow-xl block w-full h-40 md:h-60 hover:rotate-0 transition duration-200"
            />
          </motion.div>
        ))}
        {/* 
        // <Image
        //   src="https://images.unsplash.com/photo-1692544350322-ac70cfd63614?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
        //   width={200}
        //   height={400}
        //   alt="about"
        //   className="rounded-md object-cover transform rotate-3 shadow-xl block w-full h-40 md:h-60 hover:rotate-0 transition duration-200"
        // />
        // <Image
        //   src="https://images.unsplash.com/photo-1692374227159-2d3592f274c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
        //   width={200}
        //   height={400}
        //   alt="about"
        //   className="rounded-md object-cover transform -rotate-3 shadow-xl block w-full h-40 md:h-60  hover:rotate-0 transition duration-200"
        // />
        // <Image
        //   src="https://images.unsplash.com/photo-1692005561659-cdba32d1e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
        //   width={200}
        //   height={400}
        //   alt="about"
        //   className="rounded-md object-cover transform rotate-3 shadow-xl block w-full h-40 md:h-60  hover:rotate-0 transition duration-200"
        // />
        // <Image
        //   src="https://images.unsplash.com/photo-1692445381633-7999ebc03730?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
        //   width={200}
        //   height={400}
        //   alt="about"
        //   className="rounded-md object-cover transform -rotate-3 shadow-xl block w-full h-40 md:h-60  hover:rotate-0 transition duration-200"
        // /> */}
      </div>

      <div className="max-w-4xl">
        <Paragraph className=" mt-4">
        你好，我是 一民（Louis），目前在 南加州大学（USC）ECE 方向学习与研究。我长期关注的是 大模型系统与效率优化：如何把模型能力与工程约束结合起来，在真实场景中做到“可用、可靠、可控”。
        对我来说，做 AI 不是只追逐一次性的指标提升，而是把一个想法从论文式的结论，变成能被复现、能被迭代、能被部署的系统——覆盖数据、训练、评测、推理到产品形态的完整闭环。
        </Paragraph>
        <Paragraph className=" mt-4">
        我主要围绕三个主题展开工作：
 1.LLM 微调与对齐：包括 LoRA/PEFT 等参数高效微调方法，也会结合任务特性探索更稳健的训练流程（数据构造、指令质量、reward 设计、训练稳定性与泛化等）。
 2.Agentic RAG 系统：不仅仅“检索 + 拼接”，而是把检索、重排、工具调用、反思与再检索组织成可迭代的 pipeline；同时重视评估体系（召回质量、答案一致性、引用正确性、失败类型分析），让系统能够持续进化。
 3.端到端效率优化与工程化：从显存占用与吞吐、到 profiling 与瓶颈定位，再到部署与服务稳定性。我喜欢把“能跑”推进到“跑得稳、跑得省、跑得清楚为什么”
        </Paragraph>

        <Paragraph className=" mt-4">
        我做项目时最看重三件事：可复现、可评估、可交付。
		    可复现：环境一致性、依赖管理、实验记录与配置分离，确保结果不是“某台机器上的一次好运气”。
	      可评估：我倾向于先定义指标与基线，再做迭代；不仅看平均分，也看长尾失败样例，去理解模型在什么条件下会崩、为什么会崩。
  	    可交付：我希望最终产出不止是 notebook，而是一套可以被别人理解、接入与维护的系统：清晰的接口、可观测性、合理的默认参数，以及对边界条件的诚实说明。
        为此，我也在持续补齐工程能力与软件开发体系化训练，例如学习 Stanford CS146S（Modern Software Development） 来强化现代工程实践与协作方式。我的目标是不只让模型“会回答”，而是让它在复杂场景里 稳定、可控、成本可接受；同时也让系统的每次提升都能被解释，而不是靠玄学调参。
        </Paragraph>
        <Paragraph className=" mt-4">
        我适合参与从 0 到 1 的原型构建，也喜欢在 1 到 N 的阶段做系统化优化：把任务拆解成可验证的模块，建立评测闭环，明确瓶颈并持续迭代。如果你正在做 LLM 系统、RAG、推理加速、训练效率 或把研究结果推进到工程落地，欢迎交流。
        我也很愿意讨论更细的技术问题：比如如何做更可靠的 RAG 评估、如何在资源约束下选择微调策略、如何让 agent 的工具调用更可控，以及怎样把实验流程做得更工程化。
        </Paragraph>
        <Paragraph className=" mt-4">
        工作之外，我喜欢写技术笔记、整理“从问题到答案”的推导过程，也喜欢做小而精的 demo，让想法更容易被理解与复用。
        如果你对我的项目、研究方向或合作机会感兴趣，随时可以联系我；我也乐于与同样重视严谨与工程质量的人一起把事情做扎实。
        </Paragraph>
      </div>
    </div>
  );
}
