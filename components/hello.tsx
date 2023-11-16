'use client';

import { api } from '@/providers/trpc';

export const Hello = () => {
  const { data } = api.hello.getHello.useQuery();
  return <h1 className="text-center my-4 text-xl md:text-3xl">{data?.greeting}</h1>;
};
