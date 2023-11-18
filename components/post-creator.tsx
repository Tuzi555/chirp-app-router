'use client';

import { FC, useState } from 'react';
import { Card } from '@/components/ui/card';
import { SignedIn, useUser } from '@clerk/nextjs';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { api } from '@/providers/trpc';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const PostCreator: FC = () => {
  const { user } = useUser();
  const [input, setInput] = useState('');
  const { refresh } = useRouter();

  const { mutate: createPost, isLoading: isPosting } = api.posts.createPost.useMutation({
    onSuccess: () => {
      setInput('');
      refresh();
    },
    onError: (error) => {
      console.log(error);
      const errorMessage = error.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) toast.error(errorMessage[0]);
      else toast.error('Failed to post! Please try again later.');
    }
  });

  return (
    <>
      <SignedIn>
        <Card className="mb-4 flex w-full flex-row gap-3 p-4 md:max-w-2xl">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.imageUrl} alt="Your profile image" />
            <AvatarFallback>{user?.firstName?.at(0)}</AvatarFallback>
          </Avatar>
          <div className="flex w-full items-center">
            <Input
              placeholder="Type some emojis!"
              className="mr-4"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              disabled={isPosting}
            />
            <Button
              size="icon"
              onClick={() => {
                createPost({ content: input });
              }}
              disabled={input.length === 0 || isPosting}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Button>
          </div>
        </Card>
      </SignedIn>
    </>
  );
};
