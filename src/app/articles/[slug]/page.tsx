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
    <div className="min-h-screen bg-gray-50 py-8">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-8">
            <header className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <Link 
                  href="/articles"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  ← 返回文章列表
                </Link>
                {article.category && (
                  <Link
                    href={`/categories/${article.category.slug}`}
                    className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    {article.category.name}
                  </Link>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {article.title}
              </h1>
              <div className="mt-4 text-sm text-gray-500 space-x-4">
                <span>发布于 {new Date(article.createdAt).toLocaleDateString()}</span>
                {article.updatedAt !== article.createdAt && (
                  <span>更新于 {new Date(article.updatedAt).toLocaleDateString()}</span>
                )}
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              {article.content}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
} 