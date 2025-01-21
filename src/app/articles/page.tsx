import Link from "next/link";
import { db } from "@/db";
import { contents, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export default async function ArticlesPage() {
  // 获取所有已发布的文章
  const articles = await db.select({
    id: contents.id,
    title: contents.title,
    content: contents.content,
    slug: contents.slug,
    createdAt: contents.createdAt,
    categoryId: contents.categoryId,
    category: categories,
  })
  .from(contents)
  .leftJoin(categories, eq(contents.categoryId, categories.id))
  .where(eq(contents.isPublished, true))
  .orderBy(desc(contents.createdAt));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">所有文章</h1>
        
        <div className="grid gap-6">
          {articles.map((article) => (
            <Link 
              key={article.id} 
              href={`/articles/${article.slug}`}
              className="block bg-white shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                    {article.title}
                  </h2>
                  {article.category && (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {article.category.name}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.content.substring(0, 200)}...
                </p>
                <div className="text-sm text-gray-500">
                  {new Date(article.createdAt).toLocaleDateString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 