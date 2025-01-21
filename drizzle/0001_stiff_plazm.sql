CREATE TABLE `tools` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`category` text NOT NULL,
	`download_url` text NOT NULL,
	`size` text NOT NULL,
	`version` text NOT NULL,
	`icon` text NOT NULL,
	`download_count` integer DEFAULT 0,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
