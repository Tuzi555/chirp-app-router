-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "Post" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"content" varchar(255) NOT NULL,
	"authorId" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "Post_authorId_idx" ON "Post" ("authorId");
*/