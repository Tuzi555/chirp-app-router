import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { z } from 'zod';
import { createPost } from '@/server/database/repository/post';

export const postsRouter = createTRPCRouter({
  createPost: publicProcedure
    .input(
      z.object({
        content: z
          .string()
          .min(1, 'You typed no emoji? 🫥')
          .emoji('Only emojis are allowed. 🥸')
          .max(255, 'To many emojis! 🤫🤫🤫')
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId!;
      await createPost(input.content, authorId);
    })
});
