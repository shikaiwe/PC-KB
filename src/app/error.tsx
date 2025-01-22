'use client';

import Link from 'next/link';
import { Home, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* 错误图标 */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-red-600 dark:text-red-500">
            {error.name === 'ForbiddenError' ? '403' : 'Error'}
          </div>
        </div>
        
        {/* 错误信息 */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {error.name === 'ForbiddenError' ? '访问被拒绝' : '发生错误'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {error.name === 'ForbiddenError' 
            ? '抱歉，您没有权限访问此页面。'
            : '抱歉，处理您的请求时出现了问题。'}
        </p>

        {/* 建议操作 */}
        <div className="space-y-4">
          <div className="text-gray-600 dark:text-gray-400">
            您可以：
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              返回首页
            </Link>
            <button 
              onClick={() => reset()}
              className="flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              重试
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 