import { PostCreator } from '@/components/post-creator';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { SigninSignupPrompt } from '@/components/signin-signup-prompt';
import { PostFeed, PostFeedSkeleton } from '@/components/post-feed';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <>
      <main className="flex flex-col items-center overflow-hidden">
        <SignedOut>
          <SigninSignupPrompt />
        </SignedOut>
        <SignedIn>
          <PostCreator />
        </SignedIn>
        <Suspense fallback={<PostFeedSkeleton />}>
          <PostFeed />
        </Suspense>
      </main>
    </>
  );
}
