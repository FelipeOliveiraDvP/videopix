import { Link, useForm } from "@inertiajs/react";

const Create = () => {
  const { data, setData, errors, post, processing } = useForm({
    title: "",
    body: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post(route("posts.store"));
  }

  return (
    <div>
      <h1>Create a new Post</h1>
      <div>
        <Link href={route("posts.index")}>Back to Posts List</Link>
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
          Create
        </button>
      </form>
    </div>
  );
};

export default Create;
