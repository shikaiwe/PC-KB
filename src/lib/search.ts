import { db } from "@/db";
import { contents, tools, categories } from "@/db/schema";
import { sql } from "drizzle-orm";

interface SearchResult {
  id: number;
  display_title: string;
  display_content: string;
  category: string;
  type: 'content' | 'tool';
  rank: number;
}

// 统一搜索所有内容
export async function searchContents(query: string) {
  if (!query) return { hits: [] };

  try {
    // 使用 FTS 搜索内容和工具
    let results: SearchResult[];
    try {
      results = await db.all<SearchResult>(sql`
        WITH search_results AS (
          SELECT 
            id,
            title as display_title,
            content as display_content,
            category,
            type,
            rank
          FROM (
            SELECT 
              id,
              title,
              content,
              category,
              type,
              rank
            FROM content_fts
            WHERE content_fts MATCH ${query}
            UNION ALL
            SELECT 
              id,
              name as title,
              description as content,
              category,
              type,
              rank
            FROM tool_fts
            WHERE tool_fts MATCH ${query}
          )
        )
        SELECT * FROM search_results
        ORDER BY rank DESC
        LIMIT 20
      `);
    } catch (error) {
      // 如果 FTS 查询失败，回退到普通搜索
      const contentResults = await db
        .select()
        .from(contents)
        .where(sql`title LIKE ${`%${query}%`} OR content LIKE ${`%${query}%`}`)
        .limit(10)
        .all();

      const toolResults = await db
        .select()
        .from(tools)
        .where(sql`name LIKE ${`%${query}%`} OR description LIKE ${`%${query}%`}`)
        .limit(10)
        .all();

      results = [
        ...contentResults.map(c => ({
          id: c.id,
          display_title: c.title,
          display_content: c.content,
          category: '',
          type: 'content' as const,
          rank: 0,
        })),
        ...toolResults.map(t => ({
          id: t.id,
          display_title: t.name,
          display_content: t.description,
          category: t.category,
          type: 'tool' as const,
          rank: 0,
        })),
      ];
    }

    if (!results.length) {
      return { hits: [] };
    }

    // 获取完整的内容和工具信息
    const contentIds = results.filter((r: SearchResult) => r.type === 'content').map((r: SearchResult) => r.id);
    const toolIds = results.filter((r: SearchResult) => r.type === 'tool').map((r: SearchResult) => r.id);

    const [contentDetails, toolDetails] = await Promise.all([
      contentIds.length > 0
        ? db.select().from(contents).where(sql`id IN ${contentIds}`).all()
        : Promise.resolve([]),
      toolIds.length > 0
        ? db.select().from(tools).where(sql`id IN ${toolIds}`).all()
        : Promise.resolve([])
    ]);

    // 合并搜索结果和详细信息
    const hits = results.map((result: SearchResult) => {
      if (result.type === 'content') {
        const detail = contentDetails.find(c => c.id === result.id);
        return {
          id: result.id,
          title: result.display_title,
          content: result.display_content,
          createdAt: detail?.createdAt,
          type: 'content' as const,
          category: result.category,
        };
      } else {
        const detail = toolDetails.find(t => t.id === result.id);
        return {
          id: result.id,
          title: result.display_title,
          content: result.display_content,
          createdAt: detail?.createdAt,
          type: 'tool' as const,
          category: result.category,
          downloadUrl: detail?.downloadUrl,
          icon: detail?.icon,
          version: detail?.version,
          size: detail?.size,
        };
      }
    });

    return { hits };
  } catch (error) {
    console.error('Search error:', error);
    return { hits: [] };
  }
} 