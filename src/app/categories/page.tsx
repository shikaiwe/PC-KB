import Link from "next/link";
import { db } from "@/db";
import { categories, contents } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export default async function CategoriesPage() {
  // 获取所有分类及其文章数量
  const categoriesWithCount = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      articleCount: sql<number>`count(${contents.id})`.as('article_count'),
    })
    .from(categories)
    .leftJoin(contents, eq(categories.id, contents.categoryId))
    .groupBy(categories.id)
    .orderBy(categories.sort);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">所有分类</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesWithCount.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group block bg-white dark:bg-gray-800 shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                  {category.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {category.description}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {category.articleCount} 篇文章
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 