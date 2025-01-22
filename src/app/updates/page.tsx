import { db } from "@/db";
import { contents, tools } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { FileText, Clock, Wrench } from "lucide-react";

type ArticleUpdate = {
  type: 'article';
  title: string;
  updatedAt: Date;
  slug: string;
  icon: JSX.Element;
};

type ToolUpdate = {
  type: 'tool';
  title: string;
  updatedAt: Date;
  description: string;
  icon: JSX.Element;
};

type Update = ArticleUpdate | ToolUpdate;

export default async function UpdatesPage() {
  // 获取所有已发布的文章
  const articles = await db.select()
    .from(contents)
    .where(eq(contents.isPublished, true))
    .orderBy(desc(contents.updatedAt));

  // 获取所有工具
  const toolsList = await db.select()
    .from(tools)
    .orderBy(desc(tools.updatedAt));

  // 合并并按更新时间排序
  const allUpdates: Update[] = [
    ...articles.map(article => ({
      type: 'article' as const,
      title: article.title,
      updatedAt: new Date(article.updatedAt),
      slug: article.slug,
      icon: <FileText className="w-5 h-5" />,
    })),
    ...toolsList.map(tool => ({
      type: 'tool' as const,
      title: tool.name,
      updatedAt: new Date(tool.updatedAt),
      description: tool.description,
      icon: <Wrench className="w-5 h-5" />,
    }))
  ].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">更新历史</h1>
          <p className="mt-2 text-gray-600">所有内容的更新记录，按时间倒序排列</p>
        </div>

        <div className="space-y-6">
          {allUpdates.map((update, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-all">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 text-blue-600">
                  {update.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {update.updatedAt.toLocaleDateString()}
                    </div>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {update.type === 'article' ? '文章' : '工具'}
                    </span>
                  </div>
                  {update.type === 'article' ? (
                    <Link href={`/articles/${update.slug}`} className="mt-2 block">
                      <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                        {update.title}
                      </h2>
                    </Link>
                  ) : (
                    <div className="mt-2">
                      <h2 className="text-xl font-semibold text-gray-900">{update.title}</h2>
                      <p className="mt-1 text-gray-600">{update.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 