'use server';

import { db } from '@/database/db';
import { sql } from 'drizzle-orm';
import { SelectPost } from '@/database/schema';
import { clerkClient } from '@clerk/nextjs';

type PostWithAuthor = {
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
      ORDER BY "createdAt" DESC LIMIT 100
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
