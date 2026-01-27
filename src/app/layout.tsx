import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";
import FloatingAI from "@/components/FloatingAI";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont", 
    "'PingFang SC'",
    "'Hiragino Sans GB'",
    "'Microsoft YaHei'",
    "'Helvetica Neue'",
    "Helvetica",
    "Arial",
    "sans-serif"
  ]
});

export const metadata: Metadata = {
  title: "刘一民 Yimin Liu - AI/LLM DEVops ",
  description:
    "刘一民目前就读于USC，是一名研一学生，爱好学习AI领域的知识。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body
        className={twMerge(
          inter.className,
          "flex antialiased h-screen overflow-hidden bg-gray-100"
        )}
      >
        <Sidebar />
        <div className="lg:pl-2 lg:pt-2 bg-gray-100 flex-1 overflow-y-auto">
          <div className="flex-1 bg-white min-h-screen lg:rounded-tl-xl border border-transparent lg:border-neutral-200 overflow-y-auto">
            {children}
            <Footer />
          </div>
        </div>
        <FloatingAI />
      </body>
    </html>
  );
}
