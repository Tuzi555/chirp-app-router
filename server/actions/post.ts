'use server';

import { z } from 'zod';
import { authAction } from '@/server/actions/actions-client';
import { insertPost } from '@/server/database/repository/post';
import { revalidatePath } from 'next/cache';

const createPostSchema = z.object({
  content: z
    .string()
    .min(1, 'You typed no emoji? 🫥')
    .emoji('Only emojis are allowed. 🥸')
    .max(255, 'To many emojis! 🤫🤫🤫')
});

export const createPost = authAction(createPostSchema, async ({ content }, { userId }) => {
  await insertPost(content, userId);
  revalidatePath('/');
  return { created: true };
});
