'use server';

import { db } from '@/server/database/db';
import { sql } from 'drizzle-orm';
import { SelectPost } from '@/server/database/schema';
import { auth, clerkClient } from '@clerk/nextjs';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type PostWithAuthor = {
  post: {
    id: number;
    createdAt: string;
    content: string;
  };
  author: {
    username: string;
    profileImageUrl: string;
  };
};

export async function getPosts() {
  const postsPromise = db.execute(sql`
        SELECT *
        FROM "Post"
        ORDER BY "createdAt" DESC
        LIMIT 100
    `);

  const usersPromise = clerkClient.users.getUserList();

  const [posts, users] = await Promise.all([postsPromise, usersPromise]);

  return posts.map((postDb) => {
    const post = postDb as SelectPost;
    const author = users.find((user) => user.id === post.authorId);
    if (!author) throw new Error('Author for post not found');
    return {
      post: {
        id: post.id,
        createdAt: post.createdAt,
        content: post.content
      },
      author: {
        username: author.username,
        profileImageUrl: author.imageUrl
      }
    } as PostWithAuthor;
  });
}

export async function createPost(content: string, authorId: string) {
  const post = await db.execute(sql`
        INSERT INTO "Post" ("content", "authorId")
        VALUES (${content}, ${authorId})
        RETURNING *
    `);
}
