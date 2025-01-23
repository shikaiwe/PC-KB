import { db } from "@/db";
import { contents, tools, categories } from "@/db/schema";
import { sql } from "drizzle-orm";
import { unstable_cache } from 'next/cache';

interface SearchResult {
  id: number;
  title: string;
  content: string;
  category?: string;
  type: 'content' | 'tool';
  slug?: string;
  createdAt?: Date;
  downloadUrl?: string;
  size?: string;
  version?: string;
}

interface ContentSearchResult {
  id: number;
  title: string;
  content: string;
  type: string;
  slug: string;
  createdAt: string | null;
  category: string | null;
  rank: number;
}

interface ToolSearchResult {
  id: number;
  title: string;
  content: string;
  type: string;
  category: string | null;
  downloadUrl: string | null;
  size: string | null;
  version: string | null;
  rank: number;
}

// 缓存搜索结果
const cachedSearch = unstable_cache(
  async (query: string) => {
    if (!query) return { hits: [] };

    try {
      // 使用 FTS 搜索文章
      const [contentResults, toolResults] = await Promise.all([
        db.all<ContentSearchResult>(sql`
          SELECT 
            c.id,
            c.title,
            c.content,
            'content' as type,
            c.slug,
            c.created_at as createdAt,
            cat.name as category,
            rank
          FROM content_fts 
          JOIN contents c ON c.id = content_fts.id
          LEFT JOIN categories cat ON c.category_id = cat.id
          WHERE content_fts MATCH ${query}
          AND c.is_published = 1
          ORDER BY rank
          LIMIT 10
        `),
        db.all<ToolSearchResult>(sql`
          SELECT 
            t.id,
            t.name as title,
            t.description as content,
            'tool' as type,
            t.category,
            t.download_url as downloadUrl,
            t.size,
            t.version,
            rank
          FROM tool_fts
          JOIN tools t ON t.id = tool_fts.id
          WHERE tool_fts MATCH ${query}
          ORDER BY rank
          LIMIT 10
        `)
      ]);

      // 合并结果
      const results: SearchResult[] = [
        ...contentResults.map((c: ContentSearchResult) => ({
          id: c.id,
          title: c.title,
          content: c.content,
          type: 'content' as const,
          slug: c.slug,
          createdAt: c.createdAt ? new Date(c.createdAt) : undefined,
          category: c.category || undefined
        })),
        ...toolResults.map((t: ToolSearchResult) => ({
          id: t.id,
          title: t.title,
          content: t.content,
          type: 'tool' as const,
          category: t.category || undefined,
          downloadUrl: t.downloadUrl || undefined,
          size: t.size || undefined,
          version: t.version || undefined
        }))
      ];

      // 按相关性排序
      results.sort((a, b) => {
        const aScore = getRelevanceScore(a, query);
        const bScore = getRelevanceScore(b, query);
        return bScore - aScore;
      });

      return { hits: results };
    } catch (error) {
      console.error('Search error:', error);
      return fallbackSearch(query);
    }
  },
  ['search-results'],
  { revalidate: 60 } // 1分钟缓存
);

// 导出优化后的搜索函数
export async function searchContents(query: string) {
  // 清理和标准化搜索查询
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return { hits: [] };

  try {
    return await cachedSearch(cleanQuery);
  } catch (error) {
    console.error('Cached search error:', error);
    return { hits: [] };
  }
}

// 计算搜索结果的相关性分数
function getRelevanceScore(result: SearchResult, query: string): number {
  let score = 0;
  const lowerQuery = query.toLowerCase();
  
  // 标题匹配权重更高
  if (result.title.toLowerCase().includes(lowerQuery)) {
    score += 10;
  }
  
  // 内容匹配
  if (result.content.toLowerCase().includes(lowerQuery)) {
    score += 5;
  }
  
  // 分类匹配
  if (result.category?.toLowerCase().includes(lowerQuery)) {
    score += 3;
  }

  return score;
}

// 回退搜索方法（使用 LIKE 查询）
async function fallbackSearch(query: string) {
  const contentResults = await db
    .select({
      id: contents.id,
      title: contents.title,
      content: contents.content,
      type: sql<'content'>`'content'`,
      slug: contents.slug,
      createdAt: contents.createdAt,
      categoryId: contents.categoryId
    })
    .from(contents)
    .where(
      sql`(${contents.title} LIKE ${`%${query}%`} OR ${contents.content} LIKE ${`%${query}%`}) AND ${contents.isPublished} = 1`
    )
    .limit(10);

  const toolResults = await db
    .select({
      id: tools.id,
      title: tools.name,
      content: tools.description,
      type: sql<'tool'>`'tool'`,
      category: tools.category,
      downloadUrl: tools.downloadUrl,
      size: tools.size,
      version: tools.version
    })
    .from(tools)
    .where(
      sql`${tools.name} LIKE ${`%${query}%`} OR ${tools.description} LIKE ${`%${query}%`}`
    )
    .limit(10);

  // 获取文章分类信息
  const categoryIds = [...new Set(contentResults.map(r => r.categoryId).filter(Boolean))];
  const categoriesMap = new Map();
  
  if (categoryIds.length > 0) {
    const categoryResults = await db
      .select({
        id: categories.id,
        name: categories.name
      })
      .from(categories)
      .where(sql`${categories.id} IN (${categoryIds.join(',')})`);

    categoryResults.forEach(cat => {
      categoriesMap.set(cat.id, cat.name);
    });
  }

  const results: SearchResult[] = [
    ...contentResults.map(c => ({
      id: c.id,
      title: c.title,
      content: c.content,
      type: 'content' as const,
      slug: c.slug,
      createdAt: c.createdAt,
      category: c.categoryId ? categoriesMap.get(c.categoryId) : undefined
    })),
    ...toolResults.map(t => ({
      id: t.id,
      title: t.title,
      content: t.content,
      type: 'tool' as const,
      category: t.category || undefined,
      downloadUrl: t.downloadUrl || undefined,
      size: t.size || undefined,
      version: t.version || undefined
    }))
  ];

  return { hits: results };
} 