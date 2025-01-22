import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { categories, contents } from "@/db/schema";
import { desc, eq, and } from "drizzle-orm";

interface Props {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  // 获取分类信息
  const category = await db.query.categories.findFirst({
    where: eq(categories.slug, params.slug),
  });

  if (!category) {
    notFound();
  }

  // 获取该分类下的所有已发布文章
  const articles = await db.select()
    .from(contents)
    .where(
      and(
        eq(contents.categoryId, category.id),
        eq(contents.isPublished, true)
      )
    )
    .orderBy(desc(contents.createdAt));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/categories"
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            ← 返回分类列表
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">{category.name}</h1>
          {category.description && (
            <p className="mt-2 text-gray-600 dark:text-gray-300">{category.description}</p>
          )}
        </div>

        <div className="grid gap-6">
          {articles.map(article => (
            <div key={article.id} className="bg-white dark:bg-gray-800 shadow rounded-lg hover:shadow-md transition-shadow">
              <div className="p-6">
                <Link href={`/articles/${article.slug}`}>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                    {article.title}
                  </h2>
                </Link>
                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={article.createdAt}>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </time>
                  {article.type === 'external' && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
                        外部文章
                      </span>
                    </>
                  )}
                </div>
                {article.content && (
                  <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-2">
                    {article.content}
                  </p>
                )}
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