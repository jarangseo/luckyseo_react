import "./posts.styles.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts } from "../../api";
import { queryKeys } from "../../utils/queryKeys";

const totalPages = 10;

const Post = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: queryKeys.posts.list(currentPage),
    queryFn: () => fetchPosts(currentPage),
    // staleTime: 1000 * 60 * 5,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.posts.list(currentPage + 1),
      queryFn: () => fetchPosts(currentPage + 1),
    });
  }, [currentPage, queryClient]);

  // replace with useQuery
  // const data = [];

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div>
        Error: {error.message}
        <br />
        {error.stack}
      </div>
    );

  // 추가 안전장치: data가 배열인지 확인
  if (!data || !Array.isArray(data)) {
    return <div>No data available</div>;
  }

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="post-container">
      <ul>
        {data.map((post) => (
          <li key={post.id} className="post-title">
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button disabled={currentPage >= totalPages} onClick={handleNextPage}>
          Next page
        </button>
      </div>
    </div>
  );
};

export default Post;
