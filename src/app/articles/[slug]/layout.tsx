import { db } from '@/db';
import { contents } from '@/db/schema';
import { eq } from 'drizzle-orm';
import Breadcrumb from '@/components/Breadcrumb';

export default async function ArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  // 获取文章标题
  const article = await db
    .select({ title: contents.title })
    .from(contents)
    .where(eq(contents.slug, params.slug))
    .limit(1);

  const articleTitle = article[0]?.title;

  return (
    <div>
      <Breadcrumb articleTitle={articleTitle} />
      {children}
    </div>
  );
} 