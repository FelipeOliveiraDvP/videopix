import { Link, router, usePage } from "@inertiajs/react";

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
        <Link href={route("posts.create")}>Create a new post</Link>
      </div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <div>
            <Link href={route("posts.edit", post.id)}>Edit</Link>{" "}
            <button
              type="button"
              onClick={() => router.delete(route("posts.destroy", post.id))}
            >
              Remove
            </button>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Index;
