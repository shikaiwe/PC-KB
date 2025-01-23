-- migrate:up

-- 创建分类表
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (ROUND(unixepoch() * 1000))
);

-- 创建内容表
CREATE TABLE contents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  slug TEXT NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  sort INTEGER NOT NULL DEFAULT 0,
  is_published INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL DEFAULT 'original',
  source_url TEXT,
  created_at INTEGER NOT NULL DEFAULT (ROUND(unixepoch() * 1000)),
  updated_at INTEGER NOT NULL DEFAULT (ROUND(unixepoch() * 1000))
);

-- 创建工具表
CREATE TABLE tools (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  download_url TEXT,
  size TEXT,
  version TEXT,
  download_count INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (ROUND(unixepoch() * 1000)),
  updated_at INTEGER NOT NULL DEFAULT (ROUND(unixepoch() * 1000))
);

-- 创建内容搜索表
CREATE VIRTUAL TABLE content_fts USING fts5(
  id UNINDEXED,
  title,
  content,
  category,
  type,
  tokenize='porter unicode61'
);

-- 创建工具搜索表
CREATE VIRTUAL TABLE tool_fts USING fts5(
  id UNINDEXED,
  name,
  description,
  category,
  type,
  tokenize='porter unicode61'
);

-- 创建触发器，在插入内容时自动更新搜索表
CREATE TRIGGER content_ai AFTER INSERT ON contents 
BEGIN
  INSERT INTO content_fts(id, title, content, category, type)
  SELECT 
    NEW.id, 
    NEW.title, 
    NEW.content, 
    COALESCE((SELECT name FROM categories WHERE id = NEW.category_id), ''),
    'content';
END;

CREATE TRIGGER content_ad AFTER DELETE ON contents 
BEGIN
  DELETE FROM content_fts WHERE id = OLD.id;
END;

CREATE TRIGGER content_au AFTER UPDATE ON contents 
BEGIN
  DELETE FROM content_fts WHERE id = OLD.id;
  INSERT INTO content_fts(id, title, content, category, type)
  SELECT 
    NEW.id, 
    NEW.title, 
    NEW.content,
    COALESCE((SELECT name FROM categories WHERE id = NEW.category_id), ''),
    'content';
END;

-- 创建触发器，在插入工具时自动更新搜索表
CREATE TRIGGER tool_ai AFTER INSERT ON tools 
BEGIN
  INSERT INTO tool_fts(id, name, description, category, type)
  VALUES (NEW.id, NEW.name, NEW.description, NEW.category, 'tool');
END;

CREATE TRIGGER tool_ad AFTER DELETE ON tools 
BEGIN
  DELETE FROM tool_fts WHERE id = OLD.id;
END;

CREATE TRIGGER tool_au AFTER UPDATE ON tools 
BEGIN
  DELETE FROM tool_fts WHERE id = OLD.id;
  INSERT INTO tool_fts(id, name, description, category, type)
  VALUES (NEW.id, NEW.name, NEW.description, NEW.category, 'tool');
END;

-- migrate:down
DROP TABLE IF EXISTS tools;
DROP TABLE IF EXISTS contents;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS content_fts;
DROP TABLE IF EXISTS tool_fts; 