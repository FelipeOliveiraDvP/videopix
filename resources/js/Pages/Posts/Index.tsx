import { Link, usePage } from "@inertiajs/react";

interface Post {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
}

const Index = () => {
  const { posts } = usePage<{ posts: Post[] }>().props;

  return (
    <div>
      <h1>My first Laravel + Inertia Project</h1>
      <div>
        <Link href="/">Back to Home</Link>{" "}
        <Link href="/posts/create">Create a new post</Link>
      </div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <div>
            <Link href={`/posts/${post.id}/edit`}>Edit</Link>{" "}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Index;
