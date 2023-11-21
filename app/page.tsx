import { getPosts } from '@/server/database/repository/post';
import { ProfileView } from '@/components/post-view';
import { PostCreator } from '@/components/post-creator';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { SigninSignupPrompt } from '@/components/signin-signup-prompt';

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <main className="flex flex-col items-center overflow-hidden">
        <SignedOut>
          <SigninSignupPrompt />
        </SignedOut>
        <SignedIn>
          <PostCreator />
        </SignedIn>
        <div className="flex w-full flex-col gap-2 overflow-y-auto md:max-w-2xl">
          {posts.map((postWithUser) => (
            <ProfileView key={postWithUser.post.id} post={postWithUser} />
          ))}
        </div>
      </main>
    </>
  );
}
