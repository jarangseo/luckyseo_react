import "./posts.styles.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchPosts, deletePost } from "../../api";
import { queryKeys } from "../../utils/queryKeys";

const totalPages = 10;

const Post = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingPostId, setDeletingPostId] = useState(null);

  const { data, isLoading, error, isError, isFetching } = useQuery({
    queryKey: queryKeys.posts.list(currentPage),
    queryFn: () => fetchPosts(currentPage),
    // staleTime: 1000 * 60 * 5,
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (postId) => deletePost(postId),
    onSuccess: () => {
      // 성공 메시지를 표시한 후 2초 뒤에 상태 초기화
      setTimeout(() => {
        setDeletingPostId(null);
        deleteMutation.reset();
      }, 2000);
    },
    onError: () => {
      // 에러 메시지를 표시한 후 3초 뒤에 상태 초기화
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

  // replace with useQuery
  // const data = [];

  if (isLoading) return <div>Loading...</div>;
  if (isFetching) return <div>Fetching...</div>;
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
        {data.map((post) => {
          const isDeleting = deletingPostId === post.id;
          const isError = deleteMutation.isError && deletingPostId === post.id;
          const isSuccess = deleteMutation.isSuccess && deletingPostId === post.id;
          
          return (
            <li key={post.id} className="post-title">
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
              <button
                className="delete-button"
                onClick={() => {
                  setDeletingPostId(post.id);
                  // queryClient.invalidateQueries({
                  //   queryKey: queryKeys.posts.list(currentPage),
                  // });
                  // queryClient.invalidateQueries({
                  //   queryKey: queryKeys.posts.detail(post.id),
                  // });
                  // queryClient.invalidateQueries({
                  //   queryKey: queryKeys.posts.comments(post.id),
                  // });
                  deleteMutation.mutate(post.id);
                }}
                disabled={deleteMutation.isPending}
                aria-label="Delete post"
              >
                <span className="delete-icon">×</span>
              </button>
              {isDeleting && deleteMutation.isPending && <div className="status-message">Deleting...</div>}
              {isError && (
                <div className="status-message error">Error: {deleteMutation.error.message}</div>
              )}
              {isSuccess && <div className="status-message success">Post deleted successfully</div>}
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

export default Post;
