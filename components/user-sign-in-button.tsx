'use client'

import { FC } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton, useSignIn } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export const UserSignInButton: FC = () => {
  const { isLoaded } = useSignIn();
  if (!isLoaded) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }
  return (
    <>
      <SignedOut>
        <Button>
          <SignInButton />
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};
