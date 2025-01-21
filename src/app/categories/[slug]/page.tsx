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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/categories"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            ← 返回分类列表
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">{category.name}</h1>
          {category.description && (
            <p className="mt-2 text-gray-600">{category.description}</p>
          )}
        </div>

        <div className="grid gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="block bg-white shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.content.substring(0, 200)}...
                </p>
                <div className="text-sm text-gray-500">
                  {new Date(article.createdAt).toLocaleDateString()}
                </div>
              </div>
            </Link>
          ))}

          {articles.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">该分类下暂无文章</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 