-- migrate:up

-- 删除已存在的触发器（如果有）
DROP TRIGGER IF EXISTS categories_created_at_update;
DROP TRIGGER IF EXISTS contents_timestamp_update;
DROP TRIGGER IF EXISTS tools_timestamp_update;

-- 修改 categories 表的触发器
CREATE TRIGGER categories_created_at_update AFTER UPDATE OF created_at ON categories
BEGIN
    UPDATE categories SET created_at = OLD.created_at WHERE id = NEW.id;
END;

-- 修改 contents 表的触发器
CREATE TRIGGER contents_timestamp_update AFTER UPDATE ON contents
BEGIN
    UPDATE contents SET 
        created_at = CASE 
            WHEN NEW.created_at != OLD.created_at THEN NEW.created_at 
            ELSE OLD.created_at 
        END,
        updated_at = CASE 
            WHEN NEW.updated_at != OLD.updated_at THEN NEW.updated_at
            WHEN NEW.title != OLD.title OR NEW.content != OLD.content OR NEW.category_id != OLD.category_id OR NEW.sort != OLD.sort OR NEW.is_published != OLD.is_published THEN ROUND(unixepoch() * 1000)
            ELSE OLD.updated_at
        END
    WHERE id = NEW.id;
END;

-- 修改 tools 表的触发器
CREATE TRIGGER tools_timestamp_update AFTER UPDATE ON tools
BEGIN
    UPDATE tools SET 
        created_at = CASE 
            WHEN NEW.created_at != OLD.created_at THEN NEW.created_at 
            ELSE OLD.created_at 
        END,
        updated_at = CASE 
            WHEN NEW.updated_at != OLD.updated_at THEN NEW.updated_at
            WHEN NEW.name != OLD.name OR NEW.description != OLD.description OR NEW.category != OLD.category OR NEW.download_url != OLD.download_url OR NEW.version != OLD.version THEN ROUND(unixepoch() * 1000)
            ELSE OLD.updated_at
        END
    WHERE id = NEW.id;
END;

-- migrate:down
DROP TRIGGER IF EXISTS categories_created_at_update;
DROP TRIGGER IF EXISTS contents_timestamp_update;
DROP TRIGGER IF EXISTS tools_timestamp_update; 