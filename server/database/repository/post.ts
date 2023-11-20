import { db } from '@/server/database/db';
import { sql } from 'drizzle-orm';
import { post, SelectPost } from '@/server/database/schema';
import { clerkClient } from '@clerk/nextjs';

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
    const authorClerkObject = users.find((user) => user.id === post.authorId);
    if (!authorClerkObject) {
      console.log('author not found and was probably deleted');
    }

    const author = {
      username: authorClerkObject?.username ?? 'unknown',
      profileImageUrl: authorClerkObject?.imageUrl ?? ''
    };

    return {
      post: {
        id: post.id,
        createdAt: post.createdAt,
        content: post.content
      },
      author
    } as PostWithAuthor;
  });
}

export async function createPost(content: string, authorId: string) {
  await db.insert(post).values({ content: content, authorId: authorId });
}
