import { pgTable, index, serial, timestamp, varchar, text } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"


export const post = pgTable("Post", {
	id: serial("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	content: varchar("content", { length: 255 }).notNull(),
	authorId: text("authorId").notNull(),
},
(table) => {
	return {
		authorIdIdx: index("Post_authorId_idx").on(table.authorId),
	}
});