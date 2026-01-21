"use client";
import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IconX, IconCopy, IconCheck } from "@tabler/icons-react";

type WechatModalProps = {
  open: boolean;
  onClose: () => void;
  wechatId: string;
  qrSrc?: string;
};

export const WechatModal: React.FC<WechatModalProps> = ({
  open,
  onClose,
  wechatId,
  qrSrc = "/wechat-qr.jpg",
}) => {
  const [copied, setCopied] = React.useState(false);

  // 处理复制功能
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(wechatId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // 降级到 document.execCommand
      try {
        const textArea = document.createElement("textarea");
        textArea.value = wechatId;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (fallbackErr) {
        console.error("复制失败:", fallbackErr);
      }
    }
  }, [wechatId]);

  // 处理Esc键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
      // 锁定背景滚动
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      // 恢复滚动
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  // 不渲染任何内容
  if (!open) return null;

  // 检查是否在浏览器环境
  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* 遮罩 */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal内容 */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-xl p-6 max-w-sm w-[92vw] max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <IconX className="h-5 w-5 text-gray-500" />
            </button>

            {/* 标题 */}
            <h2 className="text-xl font-bold text-gray-900 mb-4 pr-8">
              微信
            </h2>

            {/* 二维码 */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 flex justify-center">
              <Image
                src={qrSrc}
                alt="微信二维码"
                width={240}
                height={240}
                className="rounded-lg"
                onError={(e) => {
                  console.error('微信二维码加载失败:', qrSrc);
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `
                    <div class="w-60 h-60 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div class="text-center text-gray-500">
                        <div class="text-6xl mb-2">📱</div>
                        <p class="text-sm">二维码加载失败</p>
                        <p class="text-xs mt-1">请检查图片路径</p>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>

            {/* 微信号 */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">微信号</p>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <code className="flex-1 font-mono text-sm text-gray-900">
                  {wechatId}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-md transition-colors"
                >
                  {copied ? (
                    <>
                      <IconCheck className="h-3 w-3" />
                      已复制
                    </>
                  ) : (
                    <>
                      <IconCopy className="h-3 w-3" />
                      复制
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 提示文案 */}
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              电脑端可扫码添加；手机端可复制微信号搜索
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};