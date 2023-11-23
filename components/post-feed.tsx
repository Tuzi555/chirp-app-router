import { PostViewSkeleton, ProfileView } from '@/components/post-view';
import { selectPosts } from '@/server/database/repository/post';
import { clerkClient } from '@clerk/nextjs';

export type PostWithAuthor = {
  post: {
    id: number;
    createdAt: string;
    content: string;
  };
  author: {
    username: string;
    profileImageUrl: string;
  };
};

export const PostFeed = async () => {
  const posts = await selectPosts();
  const usersSet = new Set(posts.map((post) => post.authorId));
  console.log(usersSet);
  const users = await clerkClient.users.getUserList({ userId: Array.from(usersSet) });
  const postsWithUsers = posts.map((postDb) => {
    const user = users.find((user) => user.id === postDb.authorId);
    return {
      post: { id: postDb.id, createdAt: postDb.createdAt, content: postDb.content },
      author: {
        username: user?.username ?? 'Deleted_User',
        profileImageUrl: user?.imageUrl ?? 'skull.png'
      }
    } as PostWithAuthor;
  });

  return (
    <div className="flex w-full flex-col gap-2 overflow-y-auto md:max-w-2xl">
      {postsWithUsers.map((postWithUser) => (
        <ProfileView key={postWithUser.post.id} post={postWithUser} />
      ))}
    </div>
  );
};

export const PostFeedSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2 overflow-y-auto md:max-w-2xl">
      <PostViewSkeleton />
      <PostViewSkeleton />
      <PostViewSkeleton />
      <PostViewSkeleton />
    </div>
  );
};
