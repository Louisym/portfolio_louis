import cs336Thumb from "../../public/images/cs336_slogan.png";
import ee503Thumb from "../../public/images/QA_system_UI.png";
import uschatThumb from "../../public/images/USChat_map.png";
import repomasterThumb from "../../public/images/Repomatser.png";

export const products = [
  {
    href: "#",
    title: "CS336 · Large-Scale Language Models & Systems",
    description:
      "Stanford CS336 coursework: LLM systems experiments (training/inference), profiling, and reproducible engineering.",
    thumbnail: cs336Thumb,
    images: [cs336Thumb],
    stack: ["PyTorch", "LLM Systems", "Profiling"],
    slug: "cs336",
    content: (
      <div>
        <p>
          CS336 是我系统性学习「大模型与系统」的一门课。我把课程作业与实验当作一个长期的
          engineering log：同样的模型与数据，在不同的训练/推理配置下，瓶颈在哪里、指标如何变化、
          哪些优化真的有效。
        </p>
        <p>
          我重点关注：显存/吞吐的 trade-off、推理延迟与 KV cache 行为、batch/seq 长度对性能的影响、
          以及如何用 profiling 把“感觉慢”变成可定位的瓶颈。
        </p>
        <p>
          这部分内容更像一套可复现的实验与笔记集合（代码结构、配置、日志、可对比的结果），后续也会
          持续补充到我的文章/项目页。
        </p>
      </div>
    ),
  },
  {
    href: "#",
    title: "EE503 QA Assistant",
    description:
      "面向概率论课程的问答学习助手：文档检索 + 生成式回答 + 评估闭环，帮助高效复习与自测。",
    thumbnail: ee503Thumb,
    images: [ee503Thumb],
    stack: ["RAG", "FastAPI", "Evaluation"],
    slug: "ee503-qa-assistant",
    content: (
      <div>
        <p>
          这是我为 EE503（Probability for ECE Engineers）构建的学习型 QA Assistant。目标不是简单“答题”，
          而是把教材/讲义/笔记组织成可检索的知识库，并让回答尽量可追溯（引用/来源）与可评估。
        </p>
        <p>
          系统包含：文档切分与向量化、检索与（可选）重排、提示词模板、以及针对“错因/薄弱点”的评估与
          迭代策略。对我而言，它更像一个可复用的 RAG 工程骨架，之后也会迁移到其他课程与项目中。
        </p>
        <p>
          我特别重视失败样例分析：哪些问题检索不到、哪些会幻觉、哪些表述会误导复习 —— 然后用数据与
          评测来驱动下一轮改进。
        </p>
      </div>
    ),
  },
  {
    href: "#",
    title: "USChat",
    description:
      "我的第一个全栈练习项目：面向 USC 的 QA / Agentic RAG 助手，打通从原型到可用系统的端到端流程。",
    thumbnail: uschatThumb,
    images: [uschatThumb],
    stack: ["Full-stack", "Agentic RAG", "Deployment"],
    slug: "uschat",
    content: (
      <div>
        <p>
          USChat 是我做的第一个完整全栈项目，更像一个「入门训练场」：我希望把自己在 LLM/RAG 方向的兴趣，
          落成一个真正可用的应用，并在过程中系统练习现代软件开发的关键环节。
        </p>
        <p>
          产品定位是面向 USC 场景的 QA 助手：围绕校园相关知识与常见问题，构建 Agentic RAG 流程，并逐步补齐
          真实应用所需要的能力，例如接口设计、数据与权限边界、可观测性，以及从开发到部署的工程链路。
        </p>
        <p>
          目前我把重点放在“把链路跑通且跑稳”：从模型/检索策略选择，到评测与失败样例分析，再到部署与迭代。
          随着项目推进，我会把更具体的功能列表与里程碑（例如检索、agent 工具、前后端交互、上线方式）更新在此页。
        </p>
      </div>
    ),
  },
  {
    href: "https://github.com/QuantaAlpha/RepoMaster",
    title: "RepoMaster (Open Source)",
    description:
      "参与开源贡献（计划中）：阅读代码、定位问题、提交 PR / 新 feature，让工具更易用、更可靠。",
    thumbnail: repomasterThumb,
    images: [repomasterThumb],
    stack: ["Open Source", "TypeScript", "Agent"],
    slug: "repomaster",
    content: (
      <div>
        <p>
          RepoMaster 是我近期准备投入贡献的开源项目。我计划从“用户视角”出发：先跑通本地开发与核心流程，
          再通过 issue/讨论理解项目 roadmap，最后选择一两个高价值的改进点提交 PR。
        </p>
        <p>
          我倾向于优先做三类贡献：1) 文档与上手体验（readme / examples / quickstart）；2) 可靠性与边界条件（错误
          处理、日志、测试）；3) 小而明确的新功能（对现有模块的补齐，而不是大改架构）。
        </p>
        <p>
          目前状态：正在阅读源码与设计，并整理可贡献的切入点。完成首个 PR 后，我会把具体改动与收益更新在此页。
        </p>
      </div>
    ),
  },
];
