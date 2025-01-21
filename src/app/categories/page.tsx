import { Container, Heading, Section, Text } from "@radix-ui/themes";
import { db } from "@/db";
import { categories } from "@/db/schema";
import Link from "next/link";

export default async function CategoriesPage() {
  const allCategories = await db.select().from(categories).all();

  return (
    <Section className="py-8">
      <Container>
        <Heading size="8" className="mb-8">
          文章分类
        </Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCategories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="block"
            >
              <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow h-full">
                <Heading size="4" className="mb-2">
                  {category.name}
                </Heading>
                {category.description && (
                  <Text color="gray" size="2">
                    {category.description}
                  </Text>
                )}
              </div>
            </Link>
          ))}

          {allCategories.length === 0 && (
            <Text className="text-center py-8 text-gray-500 col-span-full">
              暂无分类
            </Text>
          )}
        </div>
      </Container>
    </Section>
  );
} 