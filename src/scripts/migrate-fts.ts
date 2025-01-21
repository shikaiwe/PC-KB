import { db } from "@/db";
import { sql } from "drizzle-orm";
import { contents, tools } from "@/db/schema";

const TABLES = {
  content_fts: `
    CREATE VIRTUAL TABLE content_fts USING fts5(
      id UNINDEXED,
      title,
      content,
      category,
      type UNINDEXED,
      tokenize='unicode61 remove_diacritics 2'
    );
  `,
  tool_fts: `
    CREATE VIRTUAL TABLE tool_fts USING fts5(
      id UNINDEXED,
      name,
      description,
      category,
      type UNINDEXED,
      tokenize='unicode61 remove_diacritics 2'
    );
  `,
};

const TRIGGERS = {
  content_ai: `
    CREATE TRIGGER content_ai 
    AFTER INSERT ON contents 
    BEGIN
      INSERT INTO content_fts(id, title, content, category, type)
      SELECT NEW.id, NEW.title, NEW.content,
             (SELECT name FROM categories WHERE id = NEW.category_id),
             'content'
      FROM contents WHERE id = NEW.id;
    END;
  `,
  content_ad: `
    CREATE TRIGGER content_ad 
    AFTER DELETE ON contents 
    BEGIN
      DELETE FROM content_fts WHERE id = OLD.id;
    END;
  `,
  content_au: `
    CREATE TRIGGER content_au 
    AFTER UPDATE ON contents 
    BEGIN
      DELETE FROM content_fts WHERE id = OLD.id;
      INSERT INTO content_fts(id, title, content, category, type)
      SELECT NEW.id, NEW.title, NEW.content,
             (SELECT name FROM categories WHERE id = NEW.category_id),
             'content'
      FROM contents WHERE id = NEW.id;
    END;
  `,
  tool_ai: `
    CREATE TRIGGER tool_ai 
    AFTER INSERT ON tools 
    BEGIN
      INSERT INTO tool_fts(id, name, description, category, type)
      SELECT NEW.id, NEW.name, NEW.description, NEW.category, 'tool'
      FROM tools WHERE id = NEW.id;
    END;
  `,
  tool_ad: `
    CREATE TRIGGER tool_ad 
    AFTER DELETE ON tools 
    BEGIN
      DELETE FROM tool_fts WHERE id = OLD.id;
    END;
  `,
  tool_au: `
    CREATE TRIGGER tool_au 
    AFTER UPDATE ON tools 
    BEGIN
      DELETE FROM tool_fts WHERE id = OLD.id;
      INSERT INTO tool_fts(id, name, description, category, type)
      SELECT NEW.id, NEW.name, NEW.description, NEW.category, 'tool'
      FROM tools WHERE id = NEW.id;
    END;
  `,
};

async function checkData() {
  // 检查原始数据
  const contentRows = await db.select().from(contents);
  console.log('内容表数据:', contentRows.length, '条');

  const toolRows = await db.select().from(tools);
  console.log('工具表数据:', toolRows.length, '条');

  // 检查 FTS 数据
  const contentFts = await db.all<{ count: number }>(sql`SELECT COUNT(*) as count FROM content_fts`);
  console.log('内容搜索表数据:', contentFts[0].count, '条');

  const toolFts = await db.all<{ count: number }>(sql`SELECT COUNT(*) as count FROM tool_fts`);
  console.log('工具搜索表数据:', toolFts[0].count, '条');
}

async function migrateFTS() {
  try {
    // 1. 删除现有的 FTS 表和触发器
    for (const table of Object.keys(TABLES)) {
      await db.run(sql.raw(`DROP TABLE IF EXISTS ${table};`));
      console.log(`执行成功: DROP TABLE IF EXISTS ${table};`);
    }

    for (const trigger of Object.keys(TRIGGERS)) {
      await db.run(sql.raw(`DROP TRIGGER IF EXISTS ${trigger};`));
      console.log(`执行成功: DROP TRIGGER IF EXISTS ${trigger};`);
    }

    // 2. 创建 FTS 表
    for (const [table, createSql] of Object.entries(TABLES)) {
      await db.run(sql.raw(createSql));
      console.log(`创建表: ${table}`);
    }

    // 3. 创建触发器
    for (const [trigger, createSql] of Object.entries(TRIGGERS)) {
      await db.run(sql.raw(createSql));
      console.log(`创建触发器: ${trigger}`);
    }

    // 4. 导入数据
    console.log('导入数据到 content_fts');
    await db.run(sql.raw(`
      INSERT INTO content_fts(id, title, content, category, type)
      SELECT 
        c.id, 
        c.title, 
        c.content, 
        COALESCE((SELECT name FROM categories WHERE id = c.category_id), ''),
        'content'
      FROM contents c;
    `));

    console.log('导入数据到 tool_fts');
    await db.run(sql.raw(`
      INSERT INTO tool_fts(id, name, description, category, type)
      SELECT 
        id, 
        name, 
        description, 
        category,
        'tool'
      FROM tools;
    `));

    // 5. 检查数据
    await checkData();

    console.log('FTS 迁移成功完成');
  } catch (error) {
    console.error('迁移过程中出错:', error);
    process.exit(1);  // 失败时退出
  }
}

// 运行迁移
migrateFTS(); 