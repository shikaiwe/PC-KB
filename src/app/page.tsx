import { db } from "@/db";
import { categories, contents, tools } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import HomeClient from "./HomeClient";
import { unstable_cache } from 'next/cache';
import { Category, Update } from "@/types/home";

// 缓存分类数据
const getCategoriesData = unstable_cache(
  async () => {
    try {
      const data = await db.select().from(categories).orderBy(categories.sort) as Category[];
      console.log('获取分类数据成功:', data.length, '条记录');
      return data;
    } catch (error) {
      console.error('获取分类数据失败:', error);
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
      const data = await db.select()
        .from(contents)
        .where(eq(contents.isPublished, true))
        .orderBy(desc(contents.updatedAt))
        .limit(3);
      console.log('获取最新内容成功:', data.length, '条记录');
      return data;
    } catch (error) {
      console.error('获取最新内容失败:', error);
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
      const data = await db.select()
        .from(tools)
        .orderBy(desc(tools.updatedAt))
        .limit(3);
      console.log('获取最新工具成功:', data.length, '条记录');
      return data;
    } catch (error) {
      console.error('获取最新工具失败:', error);
      return [];
    }
  },
  ['latest-tools'],
  { revalidate: 300 } // 5分钟缓存
);

export default async function Home() {
  try {
    console.log('开始获取主页数据...');
    
    // 并行获取数据
    const [categories, latestContents, latestTools] = await Promise.all([
      getCategoriesData(),
      getLatestContents(),
      getLatestTools()
    ]);

    console.log('数据获取成功:', {
      categories: categories.length,
      contents: latestContents.length,
      tools: latestTools.length
    });

    // 合并并按更新时间排序
    const latestUpdates: Update[] = [
      ...latestContents.map(content => ({
        type: 'article' as const,
        title: content.title,
        updatedAt: new Date(content.updatedAt),
        slug: content.slug,
      })),
      ...latestTools.map(tool => ({
        type: 'tool' as const,
        title: tool.name,
        updatedAt: new Date(tool.updatedAt),
        description: tool.description,
      }))
    ].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    return (
      <HomeClient
        categories={categories}
        latestUpdates={latestUpdates}
      />
    );
  } catch (error) {
    console.error('获取主页数据失败:', error);
    return <div>加载失败</div>;
  }
} 