declare module "@/db" {
  import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
  import * as schema from "@/db/schema";

  export const db: BetterSQLite3Database<typeof schema>;
}

declare module "@/db/schema" {
  import { InferModel } from "drizzle-orm";
  import { sql } from "drizzle-orm";

  export const contents: any;
  export const categories: any;
  export const tools: any;

  export type Content = InferModel<typeof contents>;
  export type Category = InferModel<typeof categories>;
  export type Tool = InferModel<typeof tools>;
} 