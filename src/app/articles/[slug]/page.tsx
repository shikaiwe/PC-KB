import { Container, Heading, Section, Text } from "@radix-ui/themes";
import { db } from "@/db";
import { contents, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await db
    .select()
    .from(contents)
    .where(eq(contents.slug, params.slug))
    .get();

  if (!article) {
    notFound();
  }

  const category = article.categoryId
    ? await db
        .select()
        .from(categories)
        .where(eq(categories.id, article.categoryId))
        .get()
    : null;

  return (
    <Section className="py-8">
      <Container className="max-w-4xl">
        <article className="prose prose-lg mx-auto">
          <header className="mb-8">
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {category.name}
              </Link>
            )}
            <Heading size="8" className="mt-2 mb-4">
              {article.title}
            </Heading>
            <Text size="2" color="gray">
              发布于 {new Date(article.createdAt).toLocaleDateString()}
              {article.updatedAt !== article.createdAt &&
                ` · 更新于 ${new Date(article.updatedAt).toLocaleDateString()}`}
            </Text>
          </header>

          <div
            className="prose prose-lg prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </Container>
    </Section>
  );
} 