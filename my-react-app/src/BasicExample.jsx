import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const POSTS = [
  {
    id: "123",
    text: " Hello world",
  },
  {
    id: "1234",
    text: "New World",
  },
];

function wait(duration) {
  return new Promise(
    (resolve) => setTimeout(resolve, duration),
    (reject) => setTimeout(reject, duration)
  );
}

function queryFunction(args) {
  console.log("args", args);
  return wait(1000).then(() => [...POSTS]);
}

// function errorFunction() {
//   return Promise.reject("error");
// }

const newPost = (title) => {
  return wait(1000).then(() =>
    POSTS.push({ id: crypto.randomUUID(), text: title })
  );
};

function BasicExample() {
  console.log(POSTS);
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: queryFunction,
    // queryFn: errorFunction,
  });

  const queryClient = useQueryClient();

  const newPostMutation = useMutation({
    mutationFn: newPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postsQuery.isLoading) {
    return <>Loading...</>;
  }
  if (postsQuery.error) {
    return <>{JSON.stringify(postsQuery.error)}</>;
  }

  return (
    <>
      {postsQuery.data.map((post) => (
        <div key={post.id}>{post.text}</div>
      ))}
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate("New Post")}
      >
        Add New Post
      </button>
    </>
  );
}

export default BasicExample;
