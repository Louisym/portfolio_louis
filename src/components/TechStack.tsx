"use client";
import React, { useEffect, useState } from "react";
import { Heading } from "./Heading";
import { twMerge } from "tailwind-merge";

type TechLogoItem = {
  title: string;
  src: string;
  className: string;
  fallbackSrc?: string;
};

const TechLogo = ({ item }: { item: TechLogoItem }) => {
  const [currentSrc, setCurrentSrc] = useState(item.src);

  // If the `src` changes (e.g., hot reload), reset.
  useEffect(() => {
    setCurrentSrc(item.src);
  }, [item.src]);

  return (
    <img
      src={currentSrc}
      alt={item.title}
      title={item.title}
      loading="lazy"
      className={twMerge("object-contain", item.className)}
      onError={() => {
        if (item.fallbackSrc && currentSrc !== item.fallbackSrc) {
          setCurrentSrc(item.fallbackSrc);
        }
      }}
    />
  );
};

export const TechStack = () => {
  // NOTE: Logos are loaded from external URLs (CDN/official assets) to avoid managing local files.
  // If you later enable a strict Content-Security-Policy, remember to allow these domains in img-src.
  const rows = [
    // Row 1: LLM / ML systems
    [
      { title: "PyTorch", src: "https://cdn.simpleicons.org/pytorch", className: "h-10 w-auto" },
      { title: "vLLM", src: "https://raw.githubusercontent.com/vllm-project/media-kit/main/vLLM-Logo.svg", fallbackSrc: "https://raw.githubusercontent.com/vllm-project/media-kit/main/vLLM-Logo.png", className: "h-10 w-auto" },
      { title: "LangChain", src: "https://cdn.simpleicons.org/langchain", className: "h-10 w-auto" },
      { title: "Claude Code", src: "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/claude-color.png", fallbackSrc: "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/light/claude-color.png", className: "h-10 w-auto" },
    ],

    // Row 2: Infra / deployment
    [
      { title: "Kubernetes", src: "https://cdn.simpleicons.org/kubernetes", className: "h-10 w-auto" },
      { title: "AWS", src: "https://cdn.simpleicons.org/amazonaws", className: "h-10 w-auto" },
      { title: "Docker", src: "https://cdn.simpleicons.org/docker", className: "h-10 w-auto" },
      { title: "GitHub Actions", src: "https://cdn.simpleicons.org/githubactions", className: "h-10 w-auto" },
    ],

    // Row 3: Backend / tooling (from your projects & internship)
    [
      { title: "FastAPI", src: "https://cdn.simpleicons.org/fastapi", className: "h-10 w-auto" },
      { title: "OpenSearch", src: "https://opensearch.org/assets/brand/SVG/Mark/opensearch_mark_default.svg", className: "h-10 w-auto" },
      { title: "PostgreSQL", src: "https://cdn.simpleicons.org/postgresql", className: "h-10 w-auto" },
      { title: "Ansible", src: "https://cdn.simpleicons.org/ansible", className: "h-10 w-auto" },
      { title: "Azure", src: "https://cdn.simpleicons.org/microsoftazure", className: "h-10 w-auto" },
      { title: "Linux", src: "https://cdn.simpleicons.org/linux", className: "h-10 w-auto" },
    ],
  ];
  return (
    <div>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        Tech Stack
      </Heading>
      <div className="space-y-6">
        {rows.map((row, idx) => (
          <div key={idx} className="flex flex-wrap items-center gap-x-6 gap-y-4">
            {row.map((item) => (
              <TechLogo key={item.title} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
