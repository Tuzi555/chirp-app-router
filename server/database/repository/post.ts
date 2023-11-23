'use server';

import { db } from '@/server/database/db';
import { sql } from 'drizzle-orm';
import { post, SelectPost } from '@/server/database/schema';

export async function selectPosts() {
  const posts = await db.execute(sql`
        SELECT *
        FROM "Post"
        ORDER BY "createdAt" DESC
        LIMIT 30
    `);
  return posts.map((post) => post as SelectPost);
}

export async function insertPost(content: string, authorId: string) {
  await db.insert(post).values({ content: content, authorId: authorId });
}
