import Link from "next/link";
import { Search, Wrench, Monitor, Folder, Settings, ChevronRight, ArrowRight, Book, Star, Clock } from "lucide-react";
import { db } from "@/db";
import { categories, contents } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export default async function Home() {
  // 获取分类数据
  const categoriesData = await db.select().from(categories).orderBy(categories.sort);
  
  // 获取最新文章
  const latestContents = await db.select()
    .from(contents)
    .where(eq(contents.isPublished, true))
    .orderBy(desc(contents.createdAt))
    .limit(3);

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
              <Link href="/articles" className="text-sm text-gray-600 hover:text-gray-900">文章</Link>
              <Link href="/categories" className="text-sm text-gray-600 hover:text-gray-900">分类</Link>
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
                link="/categories"
              />
              <FeatureCard
                icon={<Star className="w-6 h-6" />}
                title="精选教程"
                description="由专业技术人员编写的高质量教程"
                link="/articles"
              />
              <FeatureCard
                icon={<Clock className="w-6 h-6" />}
                title="实时更新"
                description="持续更新的技术文档和解决方案"
                link="/articles"
              />
            </div>
          </div>
        </section>

        {/* 分类导航区域 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">问题分类</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoriesData.map((category) => (
                <Link 
                  key={category.id} 
                  href={`/categories/${category.slug}`}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 最新更新区域 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">最新更新</h2>
              <Link href="/articles" className="text-blue-600 hover:text-blue-700 flex items-center">
                查看全部 <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestContents.map((content) => (
                <Link key={content.id} href={`/articles/${content.slug}`} className="group">
                  <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                    <div className="text-sm text-gray-500 mb-2">
                      {new Date(content.createdAt).toLocaleDateString()}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-blue-600">
                      {content.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {content.content.substring(0, 100)}...
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
            © {new Date().getFullYear()} PC维修知识库. All rights reserved.
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
