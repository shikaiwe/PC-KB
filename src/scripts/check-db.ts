import { db } from "@/db";
import { sql } from "drizzle-orm";

async function checkDatabase() {
  try {
    // 检查表
    const tables = await db.all<{ name: string }>(sql`
      SELECT name FROM sqlite_master 
      WHERE type='table' 
      ORDER BY name;
    `);
    console.log('数据库表:', tables.map(t => t.name));

    // 检查触发器
    const triggers = await db.all<{ name: string }>(sql`
      SELECT name FROM sqlite_master 
      WHERE type='trigger' 
      ORDER BY name;
    `);
    console.log('触发器:', triggers.map(t => t.name));

    // 检查虚拟表
    const virtualTables = await db.all<{ name: string }>(sql`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND sql LIKE '%VIRTUAL TABLE%'
      ORDER BY name;
    `);
    console.log('虚拟表:', virtualTables.map(t => t.name));

  } catch (error) {
    console.error('检查数据库失败:', error);
  }
}

// 运行检查
checkDatabase(); 