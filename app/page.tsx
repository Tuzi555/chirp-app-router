import { getPosts } from '@/database/repository/post';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-3 m-4">
      {posts.map((postWithUser) => (
        <Card className="flex flex-row p-4" key={postWithUser.post.id}>
          <Avatar>
            <AvatarImage src={postWithUser.author.profileImageUrl} alt={postWithUser.author.username} />
          </Avatar>
          <CardContent>{postWithUser.post.content}</CardContent>
        </Card>
      ))}
    </div>
  );
}
