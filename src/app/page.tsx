import { db } from "@/db";
import { categories, contents, tools } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import HomeClient from "./HomeClient";
import { FileText, Wrench } from "lucide-react";
import { Category } from "@/types/home";
import { unstable_cache } from 'next/cache';

// 缓存分类数据
const getCategoriesData = unstable_cache(
  async () => {
    try {
      return await db.select().from(categories).orderBy(categories.sort) as Category[];
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return [];
    }
  },
  ['categories'],
  { revalidate: 3600 } // 1小时缓存
);

// 缓存最新内容
const getLatestContents = unstable_cache(
  async () => {
    try {
      return await db.select()
        .from(contents)
        .where(eq(contents.isPublished, true))
        .orderBy(desc(contents.updatedAt))
        .limit(2);
    } catch (error) {
      console.error('Failed to fetch latest contents:', error);
      return [];
    }
  },
  ['latest-contents'],
  { revalidate: 300 } // 5分钟缓存
);

// 缓存最新工具
const getLatestTools = unstable_cache(
  async () => {
    try {
      return await db.select()
        .from(tools)
        .orderBy(desc(tools.updatedAt))
        .limit(2);
    } catch (error) {
      console.error('Failed to fetch latest tools:', error);
      return [];
    }
  },
  ['latest-tools'],
  { revalidate: 300 } // 5分钟缓存
);

export default async function Home() {
  try {
    // 并行获取数据
    const [categoriesData, latestContents, latestTools] = await Promise.all([
      getCategoriesData(),
      getLatestContents(),
      getLatestTools()
    ]);

    // 合并并按更新时间排序
    const latestUpdates = [
      ...latestContents.map(content => ({
        type: 'article' as const,
        title: content.title,
        updatedAt: new Date(content.updatedAt),
        slug: content.slug,
        content: content.content,
        icon: <FileText className="w-5 h-5" />,
      })),
      ...latestTools.map(tool => ({
        type: 'tool' as const,
        title: tool.name,
        updatedAt: new Date(tool.updatedAt),
        description: tool.description,
        icon: <Wrench className="w-5 h-5" />,
      }))
    ].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 3);

    return (
      <div className="flex flex-col min-h-screen">
        <HomeClient categoriesData={categoriesData} latestUpdates={latestUpdates} />
      </div>
    );
  } catch (error) {
    console.error('Error in Home page:', error);
    return <div>加载失败,请刷新页面重试</div>;
  }
} 