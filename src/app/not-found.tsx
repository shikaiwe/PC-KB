'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* 404图标 */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-blue-600 dark:text-blue-500">404</div>
        </div>
        
        {/* 错误信息 */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          页面未找到
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          抱歉，您访问的页面可能已被移动、删除或暂时不可用。
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
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
              className="flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回上一页
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 