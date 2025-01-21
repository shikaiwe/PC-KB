import { Container, Heading, Section, Text } from "@radix-ui/themes";
import { db } from "@/db";
import { contents, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, params.slug))
    .get();

  if (!category) {
    notFound();
  }

  const categoryArticles = await db
    .select()
    .from(contents)
    .where(eq(contents.categoryId, category.id))
    .all();

  return (
    <Section className="py-8">
      <Container>
        <header className="mb-8">
          <Heading size="8" className="mb-2">
            {category.name}
          </Heading>
          {category.description && (
            <Text size="3" color="gray">
              {category.description}
            </Text>
          )}
        </header>

        <div className="grid gap-6">
          {categoryArticles.map((article) => (
            <article
              key={article.id}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Link href={`/articles/${article.slug}`}>
                <Heading size="4" className="mb-2 hover:text-blue-600">
                  {article.title}
                </Heading>
              </Link>
              <Text color="gray" size="2">
                发布于 {new Date(article.createdAt).toLocaleDateString()}
              </Text>
            </article>
          ))}

          {categoryArticles.length === 0 && (
            <Text className="text-center py-8 text-gray-500">
              该分类下暂无文章
            </Text>
          )}
        </div>
      </Container>
    </Section>
  );
} 