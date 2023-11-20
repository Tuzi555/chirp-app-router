import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import dayjs from 'dayjs';
import { Card } from '@/components/ui/card';
import { FC } from 'react';
import { PostWithAuthor } from '@/server/database/repository/post';
import relativeTime from 'dayjs/plugin/relativeTime';

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
