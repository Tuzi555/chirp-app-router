import { postsRouter } from '@/server/api/routers/posts';
import { createTRPCRouter } from '@/server/api/trpc';
import { helloRouter } from '@/server/api/routers/hello';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  hello: helloRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
