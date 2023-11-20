'use client';

import { FC } from 'react';
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export const UserSignInButton: FC = () => {
  const { isLoaded, user } = useUser();
  if (!isLoaded) {
    return (
      <div className="flex flex-row items-center gap-3 rounded-md border p-1">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-28" />
      </div>
    );
  }
  return (
    <>
      <SignedOut>
        <Button>
          <SignInButton />
        </Button>
      </SignedOut>
      <SignedIn>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex flex-row gap-4 px-2" variant="outline">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} alt="Your profile image" />
                <AvatarFallback>{user?.firstName?.at(0)}</AvatarFallback>
              </Avatar>
              <p>{user?.username}</p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <a href="https://accounts.jakubtuzar.com/user">Profile</a>
            </DropdownMenuItem>
            <SignOutButton>
              <DropdownMenuItem>
                <span>Sign Out</span>
              </DropdownMenuItem>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedIn>
    </>
  );
};
