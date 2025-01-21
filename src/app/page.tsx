import Link from "next/link";
import { Search, Wrench, Monitor, Folder, Settings, ChevronRight, ArrowRight, Book, Star, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* 固定导航栏 */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-lg font-semibold text-gray-900">
              PC维修知识库
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/docs" className="text-sm text-gray-600 hover:text-gray-900">文档</Link>
              <Link href="/guides" className="text-sm text-gray-600 hover:text-gray-900">教程</Link>
              <Link href="/tools" className="text-sm text-gray-600 hover:text-gray-900">工具</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="pt-16">
        {/* Hero 区域 */}
        <section className="bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center space-y-8 max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                专业的电脑维修技术知识库
              </h1>
              <p className="text-xl text-gray-600">
                提供全面的电脑维修技术资料，帮助您解决各类电脑问题
              </p>
              
              {/* 搜索框 */}
              <div className="max-w-2xl mx-auto mt-8 relative">
                <form action="/search" method="get">
                  <div className="relative">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="q"
                      placeholder="搜索维修教程、故障解决方案..."
                      className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </form>
                <div className="mt-2 flex items-center justify-center text-sm text-gray-500">
                  热门搜索：
                  <span className="ml-2 space-x-2">
                    <Link href="/search?q=蓝屏" className="text-blue-600 hover:underline">蓝屏</Link>
                    <span>·</span>
                    <Link href="/search?q=系统重装" className="text-blue-600 hover:underline">系统重装</Link>
                    <span>·</span>
                    <Link href="/search?q=硬盘修复" className="text-blue-600 hover:underline">硬盘修复</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 特色内容区域 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Book className="w-6 h-6" />}
                title="维修指南"
                description="详细的步骤说明，帮助您快速解决问题"
                link="/guides"
              />
              <FeatureCard
                icon={<Star className="w-6 h-6" />}
                title="精选教程"
                description="由专业技术人员编写的高质量教程"
                link="/tutorials"
              />
              <FeatureCard
                icon={<Clock className="w-6 h-6" />}
                title="实时更新"
                description="持续更新的技术文档和解决方案"
                link="/latest"
              />
            </div>
          </div>
        </section>

        {/* 分类导航区域 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">问题分类</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <CategoryCard
                icon={<Wrench className="w-5 h-5" />}
                title="硬件维修"
                items={[
                  "主板故障诊断",
                  "内存问题修复",
                  "硬盘数据恢复",
                  "显卡故障维修"
                ]}
              />
              <CategoryCard
                icon={<Monitor className="w-5 h-5" />}
                title="系统维护"
                items={[
                  "系统优化加速",
                  "驱动程序更新",
                  "系统安全加固",
                  "启动问题修复"
                ]}
              />
              <CategoryCard
                icon={<Folder className="w-5 h-5" />}
                title="软件问题"
                items={[
                  "软件安装指南",
                  "兼容性问题",
                  "病毒木马清除",
                  "数据备份还原"
                ]}
              />
              <CategoryCard
                icon={<Settings className="w-5 h-5" />}
                title="日常维护"
                items={[
                  "电脑保养指南",
                  "性能优化技巧",
                  "散热系统维护",
                  "定期检查项目"
                ]}
              />
            </div>
          </div>
        </section>

        {/* 最新更新区域 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">最新更新</h2>
              <Link href="/latest" className="text-blue-600 hover:text-blue-700 flex items-center">
                查看全部 <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Link key={i} href={`/article/${i}`} className="group">
                  <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                    <div className="text-sm text-gray-500 mb-2">2024-01-{i}</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-blue-600">
                      Windows系统优化完全指南 {i}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      详细介绍如何优化Windows系统性能，包括系统设置调整、启动项管理、磁盘清理等多个方面。
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-sm text-gray-500 text-center">
            © 2024 PC维修知识库. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, link }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Link href={link} className="group">
      <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all">
        <div className="text-blue-600 mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center text-blue-600">
          <span className="text-sm">了解更多</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

function CategoryCard({ icon, title, items }: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index}>
            <Link href={`/category/${title}/${item}`} className="text-sm text-gray-600 hover:text-blue-600 flex items-center">
              <span className="mr-2">•</span>
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
