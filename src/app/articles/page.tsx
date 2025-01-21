import { Container, Heading, Section, Text } from "@radix-ui/themes";
import { db } from "@/db";
import { contents, categories } from "@/db/schema";
import Link from "next/link";

export default async function ArticlesPage() {
  const allArticles = await db.select().from(contents).all();

  return (
    <Section className="py-8">
      <Container>
        <Heading size="8" className="mb-8">
          所有文章
        </Heading>
        
        <div className="grid gap-6">
          {allArticles.map((article) => (
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

          {allArticles.length === 0 && (
            <Text className="text-center py-8 text-gray-500">
              暂无文章
            </Text>
          )}
        </div>
      </Container>
    </Section>
  );
} 