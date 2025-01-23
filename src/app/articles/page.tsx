import Link from "next/link";
import { db } from "@/db";
import { contents, categories, type Content, type Category } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { formatDateTime, getRelativeTimeString } from "@/lib/date";

// 截取中文字符串的函数
function truncateText(text: string, length: number) {
  if (text.length <= length) return text;
  return text.slice(0, length).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]$/, '') + '...';
}

export default async function ArticlesPage() {
  // 获取所有已发布的文章
  const articles = await db.select({
    id: contents.id,
    title: contents.title,
    content: contents.content,
    slug: contents.slug,
    createdAt: contents.createdAt,
    categoryId: contents.categoryId,
    type: contents.type,
    sourceUrl: contents.sourceUrl,
    category: categories,
  })
  .from(contents)
  .leftJoin(categories, eq(contents.categoryId, categories.id))
  .where(eq(contents.isPublished, true))
  .orderBy(desc(contents.createdAt));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">所有文章</h1>
        
        <div className="grid gap-6">
          {articles.map((article: Content & { category: Category | null }) => (
            <div key={article.id} className="block bg-white dark:bg-gray-800 shadow rounded-lg hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Link href={`/articles/${article.slug}`}>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                        {article.title}
                      </h2>
                    </Link>
                    {article.type === 'external' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
                        外部文章
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-end text-sm text-gray-500 dark:text-gray-400">
                    <time title={formatDateTime(article.createdAt, 'full')}>
                      {getRelativeTimeString(article.createdAt)}
                    </time>
                    <time className="text-xs">
                      {formatDateTime(article.createdAt)}
                    </time>
                  </div>
                </div>
                {article.category && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    分类：{article.category.name}
                  </div>
                )}
                <p className="text-gray-600 dark:text-gray-300">
                  {truncateText(article.content.replace(/^#.*$/m, '').trim(), 200)}
                </p>
                <div className="mt-4">
                  {article.type === 'external' && article.sourceUrl ? (
                    <a
                      href={article.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      阅读原文
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={`/articles/${article.slug}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      阅读更多 →
                    </Link>
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