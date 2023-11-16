import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const helloRouter = createTRPCRouter({
  getHello: publicProcedure.query(() => {
    return {
      greeting: `Hello from tRPC!`
    };
  })
});
