import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// 创建数据库连接
const sqlite = new Database('pc-kb.db');
const db = drizzle(sqlite);

// 执行迁移
async function migrate() {
    try {
        console.log('开始执行数据库迁移...');
        
        // 读取迁移文件目录
        const migrationFiles = fs.readdirSync('drizzle')
            .filter(file => file.endsWith('.sql'))
            .sort(); // 确保按文件名顺序执行

        for (const migrationFile of migrationFiles) {
            console.log(`处理迁移文件: ${migrationFile}`);
            
            // 读取迁移文件
            const sql = fs.readFileSync(path.join('drizzle', migrationFile), 'utf8');
            
            // 提取 migrate:up 部分的 SQL
            const upMatch = sql.match(/-- migrate:up\s+([\s\S]*?)(?=-- migrate:down|$)/);
            if (!upMatch) {
                console.log(`在文件 ${migrationFile} 中找不到 migrate:up 部分，跳过`);
                continue;
            }
            
            const upSql = upMatch[1].trim();
            
            // 分割成单独的语句，但保持触发器定义的完整性
            const statements: string[] = [];
            let currentStatement = '';
            let inTrigger = false;
            
            upSql.split('\n').forEach(line => {
                const trimmedLine = line.trim();
                
                // 跳过空行和注释
                if (!trimmedLine || trimmedLine.startsWith('--')) {
                    return;
                }
                
                // 检查是否进入触发器定义
                if (trimmedLine.startsWith('CREATE TRIGGER')) {
                    inTrigger = true;
                }
                
                // 添加当前行到语句
                currentStatement += line + '\n';
                
                // 如果不在触发器定义中，且行以分号结束，则结束当前语句
                if (!inTrigger && trimmedLine.endsWith(';')) {
                    statements.push(currentStatement.trim());
                    currentStatement = '';
                }
                // 如果在触发器定义中，且遇到 END;，则结束当前语句
                else if (inTrigger && trimmedLine === 'END;') {
                    inTrigger = false;
                    statements.push(currentStatement.trim());
                    currentStatement = '';
                }
            });
            
            console.log(`在文件 ${migrationFile} 中找到 ${statements.length} 个 SQL 语句`);
            
            // 逐个执行 SQL 语句
            for (let i = 0; i < statements.length; i++) {
                const statement = statements[i];
                if (!statement.startsWith('--')) { // 跳过注释
                    console.log(`执行第 ${i + 1} 个 SQL 语句...`);
                    try {
                        sqlite.exec(statement);
                        console.log('语句执行成功');
                    } catch (error: any) {
                        // 如果是表已存在的错误，我们跳过它
                        if (error.message.includes('already exists')) {
                            console.log('表已存在，跳过创建');
                            continue;
                        }
                        console.error('执行 SQL 语句失败:', error);
                        console.error('失败的 SQL 语句:', statement);
                        throw error;
                    }
                }
            }
        }
        
        console.log('所有数据库迁移完成！');
    } catch (error) {
        console.error('迁移失败:', error);
        process.exit(1);
    } finally {
        sqlite.close();
    }
}

migrate(); 