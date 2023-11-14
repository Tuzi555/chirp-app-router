import { getPosts } from '@/database/repository/post';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DarkModeToggle } from '@/components/dark-mode-toggle';

dayjs.extend(relativeTime);

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="flex w-full flex-col gap-2 overflow-y-auto md:max-w-2xl">
      {posts.map((postWithUser) => (
        <Card className="flex flex-row gap-3 p-4" key={postWithUser.post.id}>
          <Avatar>
            <AvatarImage src={postWithUser.author.profileImageUrl} alt={postWithUser.author.username} />
          </Avatar>
          <div>
            <span>@{postWithUser.author.username}</span>
            <span className="font-thin"> · {dayjs(postWithUser.post.createdAt).fromNow()}</span>
            <p>{postWithUser.post.content}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
