import { db } from "@/db";
import { contents, tools } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { FileText, Clock, Wrench } from "lucide-react";
import { formatDateTime, getRelativeTimeString } from "@/lib/date";

type ArticleUpdate = {
  type: 'article';
  title: string;
  updatedAt: number;
  slug: string;
};

type ToolUpdate = {
  type: 'tool';
  title: string;
  updatedAt: number;
  description: string;
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
      updatedAt: article.updatedAt,
      slug: article.slug,
    })),
    ...toolsList.map(tool => ({
      type: 'tool' as const,
      title: tool.name,
      updatedAt: tool.updatedAt,
      description: tool.description,
    }))
  ].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">更新历史</h1>
          <p className="mt-2 text-gray-600">所有内容的更新记录，按时间倒序排列</p>
        </div>

        <div className="space-y-6">
          {allUpdates.map((update, index) => (
            <div
              key={`${update.type}-${index}`}
              className="bg-white shadow rounded-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    update.type === 'article' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {update.type === 'article' ? '文章' : '工具'}
                  </span>
                  {update.type === 'article' ? (
                    <Link
                      href={`/articles/${update.slug}`}
                      className="text-lg font-medium text-gray-900 hover:text-blue-600"
                    >
                      {update.title}
                    </Link>
                  ) : (
                    <span className="text-lg font-medium text-gray-900">
                      {update.title}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-end text-sm text-gray-500">
                  <time title={formatDateTime(update.updatedAt, 'full')}>
                    {getRelativeTimeString(update.updatedAt)}
                  </time>
                  <time className="text-xs">
                    {formatDateTime(update.updatedAt)}
                  </time>
                </div>
              </div>
              {update.type === 'tool' && (
                <p className="mt-2 text-gray-600">
                  {update.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 