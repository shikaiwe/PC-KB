import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, blob, unique } from "drizzle-orm/sqlite-core";

// 分类表
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),  // 分类名称
  slug: text('slug').notNull().unique().default(''),
  description: text('description'),  // 分类描述
  sort: integer('sort').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// 内容表
export const contents = sqliteTable('contents', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),  // 文章标题（中文）
  content: text('content').notNull(),  // 文章内容（中文）
  slug: text('slug').notNull(),  // URL友好的标识符（可以是拼音或英文）
  categoryId: integer('category_id').references(() => categories.id),  // 分类ID
  sort: integer('sort').notNull().default(0),
  isPublished: integer('is_published', { mode: 'boolean' }).notNull().default(false),  // 是否发布
  type: text('type').notNull().default('original'),
  sourceUrl: text('source_url'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const tools = sqliteTable('tools', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),  // 工具名称（中文）
  description: text('description').notNull(),  // 工具描述（中文）
  category: text('category'),  // 工具分类（中文）
  downloadUrl: text('download_url'),  // 下载链接
  size: text('size'),  // 文件大小
  version: text('version'),  // 版本号
  icon: text('icon'),  // 图标链接
  downloadCount: integer('download_count').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}); 