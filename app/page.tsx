import { getPosts } from '@/server/database/repository/post';
import { ProfileView } from '@/app/post-view';
import { api } from '@/providers/trpc';
import { Hello } from '@/components/hello';

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <Hello />
      <main className="flex justify-center overflow-hidden">
        <div className="flex w-full flex-col gap-2 overflow-y-auto md:max-w-2xl">
          {posts.map((postWithUser) => (
            <ProfileView key={postWithUser.post.id} post={postWithUser} />
          ))}
        </div>
      </main>
    </>
  );
}
