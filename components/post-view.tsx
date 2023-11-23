import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import dayjs from 'dayjs';
import { Card } from '@/components/ui/card';
import { FC } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import { PostWithAuthor } from '@/components/post-feed';
import { Skeleton } from '@/components/ui/skeleton';

dayjs.extend(relativeTime);

export const ProfileView: FC<{ post: PostWithAuthor }> = ({ post }) => {
  return (
    <Card className="flex flex-row gap-3 p-4">
      <Avatar>
        <AvatarImage src={post.author.profileImageUrl} alt={post.author.username} />
        <AvatarFallback>{post.author.username?.at(0)}</AvatarFallback>
      </Avatar>
      <div>
        <span>@{post.author.username}</span>
        <span className="font-thin"> · {dayjs(post.post.createdAt).fromNow()}</span>
        <p>{post.post.content}</p>
      </div>
    </Card>
  );
};

export const PostViewSkeleton = () => {
  return (
    <Card className="flex flex-row gap-3 p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-80" />
      </div>
    </Card>
  );
};
