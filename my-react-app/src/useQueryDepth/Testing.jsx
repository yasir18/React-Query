import "../App.css";
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

export function queryFunction(args) {
  console.log("args", args);
  return wait(1000).then(() => [...POSTS]);
}

// function errorFunction() {
//   return Promise.reject("error");
// }

// queryKey should be unique, better to follow this pattern
// /posts => ["posts"]
// /posts/1 => ["posts",{post.id}]
// /posts?userId=1 => ["posts",{authorId: 1}]]
// /posts/1/comments => ["posts",{post.id}, "comments"]

function Testing() {
  console.log(POSTS);
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: queryFunction,
    // queryFn: errorFunction,
  });

  // Dependat query -> use enabled keyword
  // const dependantQuery = useQuery({
  //   queryKey: ["users", postsQuery?.data?.userId],
  //   enabled: postsQuery?.data?.userId != null,
  //   queryFn: () => getUserDetails(postsQuery?.data?.userId)
  // })

  console.log("postsQuery.fetchStatus", postsQuery.fetchStatus); // fetching -> idle or paused (when no internet)
  console.log("postsQuery.status", postsQuery.status); // pending -> success or error
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
    </>
  );
}

export default Testing;
