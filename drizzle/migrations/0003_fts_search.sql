-- 删除旧的 FTS 表（如果存在）
DROP TABLE IF EXISTS content_fts;
DROP TABLE IF EXISTS tool_fts;

-- 删除旧的触发器（如果存在）
DROP TRIGGER IF EXISTS content_ai;
DROP TRIGGER IF EXISTS content_ad;
DROP TRIGGER IF EXISTS content_au;
DROP TRIGGER IF EXISTS tool_ai;
DROP TRIGGER IF EXISTS tool_ad;
DROP TRIGGER IF EXISTS tool_au;

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

-- 初始化搜索表数据
INSERT OR REPLACE INTO content_fts(id, title, content, category, type)
SELECT 
  c.id, 
  c.title, 
  c.content, 
  COALESCE(cat.name, ''),
  'content'
FROM contents c
LEFT JOIN categories cat ON c.category_id = cat.id;

INSERT OR REPLACE INTO tool_fts(id, name, description, category, type)
SELECT 
  id, 
  name, 
  description, 
  category, 
  'tool'
FROM tools; 