ALTER TABLE `categories` ADD `slug` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `contents` ADD `slug` text DEFAULT '' NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `contents_slug_unique` ON `contents` (`slug`);