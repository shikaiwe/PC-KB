import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { contents, categories } from "@/db/schema";
import { eq } from "drizzle-orm";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params }: Props) {
  // 获取文章和分类信息
  const article = await db.select({
    id: contents.id,
    title: contents.title,
    content: contents.content,
    createdAt: contents.createdAt,
    updatedAt: contents.updatedAt,
    categoryId: contents.categoryId,
    type: contents.type,
    sourceUrl: contents.sourceUrl,
    category: categories,
  })
  .from(contents)
  .leftJoin(categories, eq(contents.categoryId, categories.id))
  .where(eq(contents.slug, params.slug))
  .then(rows => rows[0]);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="p-8">
            <header className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <Link 
                  href="/articles"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  ← 返回文章列表
                </Link>
                <div className="flex items-center space-x-4">
                  {article.type === 'external' && article.sourceUrl && (
                    <a
                      href={article.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      查看原文
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {article.category && (
                    <Link href={`/categories/${article.category.slug}`}>
                      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                        {article.category.name}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{article.title}</h1>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={article.createdAt}>
                  发布于 {new Date(article.createdAt).toLocaleDateString()}
                </time>
                {article.updatedAt && article.updatedAt !== article.createdAt && (
                  <>
                    <span className="mx-2">•</span>
                    <time dateTime={article.updatedAt}>
                      更新于 {new Date(article.updatedAt).toLocaleDateString()}
                    </time>
                  </>
                )}
              </div>
            </header>
            <div className="prose dark:prose-invert max-w-none">
              {article.content}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
} 