import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

const sqlite = new Database("pc-kb.db", { 
  verbose: console.log
});

// 数据库优化配置
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');
sqlite.pragma('synchronous = NORMAL');
sqlite.pragma('temp_store = MEMORY');
sqlite.pragma('mmap_size = 30000000000');
sqlite.pragma('page_size = 32768');
sqlite.pragma('cache_size = -2000');
sqlite.pragma('threads = 4');
sqlite.pragma('secure_delete = OFF');
sqlite.pragma('auto_vacuum = NONE');
sqlite.pragma('locking_mode = NORMAL');
sqlite.pragma('busy_timeout = 5000');
sqlite.pragma('encoding = "UTF-8"');
sqlite.pragma('case_sensitive_like = OFF');
sqlite.pragma('recursive_triggers = ON');
sqlite.pragma('legacy_file_format = OFF');
sqlite.pragma('ignore_check_constraints = OFF');
sqlite.pragma('defer_foreign_keys = OFF');
sqlite.pragma('writable_schema = OFF');
sqlite.pragma('read_uncommitted = OFF');
sqlite.pragma('reverse_unordered_selects = OFF');
sqlite.pragma('automatic_index = ON');
sqlite.pragma('checkpoint_fullfsync = OFF');
sqlite.pragma('soft_heap_limit = 0');
sqlite.pragma('hard_heap_limit = 0');
sqlite.pragma('incremental_vacuum = 0');
sqlite.pragma('application_id = 0');
sqlite.pragma('user_version = 0');
sqlite.pragma('foreign_key_check');
sqlite.pragma('integrity_check');
sqlite.pragma('quick_check');

// 启用扩展加载
sqlite.loadExtension = function(path: string) {
  return this.exec(`SELECT load_extension('${path}');`);
};

export const db = drizzle(sqlite, { schema }); 