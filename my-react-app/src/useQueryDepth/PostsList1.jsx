import { useQuery } from "@tanstack/react-query";
import { queryFunction } from "./Testing";

export default function PostsList1() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: queryFunction,
    // queryFn: errorFunction,
  });

  if (postsQuery.isLoading) {
    return <>Loading...</>;
  }
  if (postsQuery.error) {
    return <>{JSON.stringify(postsQuery.error)}</>;
  }

  return (
    <>
      <div>PostsList1</div>
      {postsQuery.data.map((post) => (
        <div key={post.id}>{post.text}</div>
      ))}
    </>
  );
}
