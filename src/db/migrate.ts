import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

async function main() {
    try {
        // 创建数据库连接
        const sqlite = new Database('pc-kb.db');
        const db = drizzle(sqlite);

        // 执行迁移
        console.log('开始执行数据库迁移...');
        await migrate(db, { migrationsFolder: './drizzle' });
        console.log('数据库迁移完成！');

        // 关闭数据库连接
        sqlite.close();
    } catch (error) {
        console.error('迁移失败:', error);
        process.exit(1);
    }
}

main(); 