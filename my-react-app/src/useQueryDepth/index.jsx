import { useState } from "react";
import PostsList1 from "./PostsList1";
import PostsList2 from "./PostsList2";

export default function TwoQueries() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);
  return (
    <>
      <button onClick={() => setCurrentPage(<PostsList1 />)}>
        Posts list 1
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>
        Posts list 2
      </button>
      <div>{currentPage}</div>
    </>
  );
}
