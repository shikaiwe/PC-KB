import { Download, Shield, Cpu, HardDrive, Monitor, Wrench, Wifi, CircuitBoard, Hammer, Terminal, Bug, Zap } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/db';
import { tools } from '@/db/schema';
import { desc } from 'drizzle-orm';

// 图标映射
const iconMap: { [key: string]: React.ReactNode } = {
  'shield': <Shield className="w-6 h-6" />,
  'cpu': <Cpu className="w-6 h-6" />,
  'hard-drive': <HardDrive className="w-6 h-6" />,
  'monitor': <Monitor className="w-6 h-6" />,
  'wrench': <Wrench className="w-6 h-6" />,
  'wifi': <Wifi className="w-6 h-6" />,
  'circuit-board': <CircuitBoard className="w-6 h-6" />,
  'hammer': <Hammer className="w-6 h-6" />,
  'terminal': <Terminal className="w-6 h-6" />,
  'bug': <Bug className="w-6 h-6" />,
  'zap': <Zap className="w-6 h-6" />,
};

export const revalidate = 3600; // 每小时重新验证一次

async function getTools() {
  return await db.select().from(tools).orderBy(desc(tools.downloadCount));
}

export default async function ToolsPage() {
  const toolsList = await getTools();
  const categories = Array.from(new Set(toolsList.map(tool => tool.category)));

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* 页面标题 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">维修工具</h1>
          <p className="mt-2 text-gray-600">提供各种专业的电脑维修和诊断工具，持续更新</p>
        </div>
      </div>

      {/* 工具列表 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {categories.map(category => (
          <div key={category} className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsList
                .filter(tool => tool.category === category)
                .map(tool => (
                  <div
                    key={tool.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-blue-600">{iconMap[tool.icon]}</div>
                        <span className="text-sm text-gray-500">v{tool.version}</span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{tool.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{tool.size}</span>
                        <Link
                          href={tool.downloadUrl}
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          下载
                        </Link>
                      </div>
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