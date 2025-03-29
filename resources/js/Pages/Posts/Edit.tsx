import { Link, useForm, usePage } from "@inertiajs/react";

interface Post {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
}

const Edit = () => {
  const { post: postEdit } = usePage<{ post: Post }>().props;
  const { data, setData, errors, post, processing } = useForm({
    title: postEdit.title || "",
    body: postEdit.body || "",
    _method: "put",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route("posts.update", postEdit.id));
  }

  return (
    <div>
      <h1>You editing the post "{postEdit.title}"</h1>
      <div>
        <Link href="/posts">Back to Posts List</Link>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            name="title"
            value={data.title}
            onChange={(e) => setData("title", e.target.value)}
          />
          <br />
          <p>{errors.title}</p>
        </div>

        <div>
          <label htmlFor="body">Body:</label>
          <br />
          <textarea
            name="body"
            value={data.body}
            onChange={(e) => setData("body", e.target.value)}
          ></textarea>
          <br />
          <p>{errors.body}</p>
        </div>

        <button type="submit" disabled={processing}>
          Edit
        </button>
      </form>
    </div>
  );
};

export default Edit;
