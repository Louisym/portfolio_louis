"use client";
import React, { useState } from "react";
import { IconDownload, IconCheck, IconX } from "@tabler/icons-react";

export const DownloadButton = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadStatus('idle');

    try {
      // 创建下载链接
      const response = await fetch('/documents/Louis_Liu_Resume.pdf');
      
      if (!response.ok) {
        throw new Error('简历文件未找到');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.download = 'Louis_Liu_Resume.pdf';
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // 清理URL对象
      window.URL.revokeObjectURL(url);
      
      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus('idle'), 3000);
      
    } catch (error) {
      console.error('下载失败:', error);
      setDownloadStatus('error');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  const getButtonContent = () => {
    if (isDownloading) {
      return (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          <span>下载中...</span>
        </>
      );
    }

    if (downloadStatus === 'success') {
      return (
        <>
          <IconCheck className="h-4 w-4" />
          <span>下载成功</span>
        </>
      );
    }

    if (downloadStatus === 'error') {
      return (
        <>
          <IconX className="h-4 w-4" />
          <span>下载失败</span>
        </>
      );
    }

    return (
      <>
        <IconDownload className="h-4 w-4" />
        <span>下载简历</span>
      </>
    );
  };

  const getButtonStyle = () => {
    if (downloadStatus === 'success') {
      return 'bg-green-500 hover:bg-green-600 border-green-500';
    }
    if (downloadStatus === 'error') {
      return 'bg-red-500 hover:bg-red-600 border-red-500';
    }
    return 'bg-blue-500 hover:bg-blue-600 border-blue-500';
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`
        flex items-center space-x-2 px-4 py-2 rounded-lg text-white text-sm font-medium
        transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5
        disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
        ${getButtonStyle()}
      `}
      title="下载PDF格式简历"
    >
      {getButtonContent()}
    </button>
  );
};