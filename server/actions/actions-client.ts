import { createSafeActionClient } from 'next-safe-action';
import { auth } from '@clerk/nextjs';

export const authAction = createSafeActionClient({
  async middleware() {
    const userId = auth().userId;
    if (!userId) {
      throw new Error('User is not authenticated');
    }
    return { userId };
  }
});
