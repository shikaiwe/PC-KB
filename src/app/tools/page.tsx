import { Download } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/db';
import { tools } from '@/db/schema';
import { desc } from 'drizzle-orm';

export const revalidate = 3600; // 每小时重新验证一次

async function getTools() {
  return await db.select().from(tools).orderBy(desc(tools.downloadCount));
}

export default async function ToolsPage() {
  const toolsList = await getTools();
  const categories = Array.from(new Set(toolsList.map(tool => tool.category)));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* 页面标题 */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">维修工具</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">提供各种专业的电脑维修和诊断工具，持续更新</p>
        </div>
      </div>

      {/* 工具列表 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {categories.map(category => (
          <div key={category} className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsList
                .filter(tool => tool.category === category)
                .map(tool => (
                  <div
                    key={tool.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        下载次数: {tool.downloadCount}
                      </p>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                      {tool.description}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                        {tool.version}
                      </span>
                      <a
                        href={tool.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        下载
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 