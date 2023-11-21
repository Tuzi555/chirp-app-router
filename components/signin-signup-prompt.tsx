import { FC } from 'react';
import { Card } from '@/components/ui/card';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export const SigninSignupPrompt: FC = () => {
  return (
    <Card className="mb-4 flex w-full flex-col justify-center gap-3 p-4 md:max-w-2xl">
      <h1 className="text-center text-3xl font-bold">Welcome chirpling 🐣</h1>
      <div className="justify-cente flex flex-col items-center">
        <div className="mb-2">
          <SignInButton>
            <Button>Sign in</Button>
          </SignInButton>
          <span className="mx-2 font-bold">or</span>
          <SignUpButton>
            <Button>Sign up</Button>
          </SignUpButton>
        </div>
        <div className="ml-2 font-bold text-xl">to start chirping!</div>
      </div>
    </Card>
  );
};
