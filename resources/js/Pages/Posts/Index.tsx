import { usePage } from "@inertiajs/react";

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
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Index;
