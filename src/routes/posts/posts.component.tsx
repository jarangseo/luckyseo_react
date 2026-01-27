import "./posts.styles.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchPosts, deletePost } from "../../api";
import { queryKeys } from "../../utils/queryKeys";
import { Post } from "../../types";

const totalPages = 10;

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingPostId, setDeletingPostId] = useState<number | null>(null);

  const { data, isLoading, error, isError, isFetching } = useQuery({
    queryKey: queryKeys.posts.list(currentPage),
    queryFn: () => fetchPosts(currentPage),
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      setTimeout(() => {
        setDeletingPostId(null);
        deleteMutation.reset();
      }, 2000);
    },
    onError: () => {
      setTimeout(() => {
        setDeletingPostId(null);
        deleteMutation.reset();
      }, 3000);
    },
  });

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.posts.list(currentPage + 1),
      queryFn: () => fetchPosts(currentPage + 1),
    });
  }, [currentPage, queryClient]);

  if (isLoading) return <div>Loading...</div>;
  if (isFetching) return <div>Fetching...</div>;
  if (isError)
    return (
      <div>
        Error: {(error as Error).message}
        <br />
        {(error as Error).stack}
      </div>
    );

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
        {data.map((post: Post) => {
          const isDeleting = deletingPostId === post.id;
          const isDeleteError =
            deleteMutation.isError && deletingPostId === post.id;
          const isSuccess =
            deleteMutation.isSuccess && deletingPostId === post.id;

          return (
            <li key={post.id} className="post-title">
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
              <button
                className="delete-button"
                onClick={() => {
                  setDeletingPostId(post.id);
                  deleteMutation.mutate(post.id);
                }}
                disabled={deleteMutation.isPending}
                aria-label="Delete post"
              >
                <span className="delete-icon">×</span>
              </button>
              {isDeleting && deleteMutation.isPending && (
                <div className="status-message">Deleting...</div>
              )}
              {isDeleteError && (
                <div className="status-message error">
                  Error: {(deleteMutation.error as Error).message}
                </div>
              )}
              {isSuccess && (
                <div className="status-message success">
                  Post deleted successfully
                </div>
              )}
            </li>
          );
        })}
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

export default Posts;
