import { getPosts } from '@/database/repository/post';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="m-4 flex flex-col gap-3">
      {posts.map((postWithUser) => (
        <Card className="flex flex-row p-4 gap-3" key={postWithUser.post.id}>
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
