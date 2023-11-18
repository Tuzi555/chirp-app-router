import { getPosts } from '@/server/database/repository/post';
import { ProfileView } from '@/app/post-view';
import { PostCreator } from '@/components/post-creator';

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <main className="flex items-center overflow-hidden flex-col">
        <PostCreator />
        <div className="flex w-full flex-col gap-2 overflow-y-auto md:max-w-2xl">
          {posts.map((postWithUser) => (
            <ProfileView key={postWithUser.post.id} post={postWithUser} />
          ))}
        </div>
      </main>
    </>
  );
}
