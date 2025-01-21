import { db } from "@/db";
import { sql } from "drizzle-orm";

async function testSearch(query: string) {
  try {
    console.log('搜索关键词:', query);

    // 构建搜索条件
    const buildSearchQuery = (field: string) => {
      return `${field}:${query}* OR ${field}:${query}`;
    };

    // 搜索内容
    const contentResults = await db.all(sql`
      SELECT 
        id,
        title,
        content,
        category,
        rank
      FROM content_fts
      WHERE content_fts MATCH ${'title:' + query + '* OR ' + 
                              'content:' + query + '* OR ' +
                              'category:' + query + '* OR ' +
                              'title:' + query + ' OR ' +
                              'content:' + query + ' OR ' +
                              'category:' + query}
      ORDER BY rank;
    `);
    console.log('\n内容搜索结果:', contentResults);

    // 搜索工具
    const toolResults = await db.all(sql`
      SELECT 
        id,
        name,
        description,
        category,
        rank
      FROM tool_fts
      WHERE tool_fts MATCH ${'name:' + query + '* OR ' + 
                            'description:' + query + '* OR ' +
                            'category:' + query + '* OR ' +
                            'name:' + query + ' OR ' +
                            'description:' + query + ' OR ' +
                            'category:' + query}
      ORDER BY rank;
    `);
    console.log('\n工具搜索结果:', toolResults);

  } catch (error) {
    console.error('搜索失败:', error);
  }
}

// 测试搜索
async function runTests() {
  const testQueries = ['系统', '维护', '软件', '故障', '蓝屏'];
  for (const query of testQueries) {
    await testSearch(query);
    console.log('\n-------------------\n');
  }
}

// 运行测试
runTests().catch(console.error); 