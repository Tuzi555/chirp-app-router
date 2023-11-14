import { db } from '@/database/db';
import { sql } from 'drizzle-orm';
import { SelectPost } from '@/database/schema';

export default async function Home() {
  const post = (
    await db.execute(sql`
      SELECT *
      FROM "Post"
      ORDER BY "createdAt" DESC LIMIT 1
  `)
  )[0] as SelectPost;
  return (
    <div className="flex justify-center">
      <h1>Hello from app router {post.content}</h1>
    </div>
  );
}
