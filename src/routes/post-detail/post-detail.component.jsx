import "./post-detail.styles.scss";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchPost, fetchComments, deletePost } from "../../api";
import { queryKeys } from "../../utils/queryKeys";

const PostDetail = () => {
  const { id } = useParams();

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
    error: postError,
  } = useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: () => fetchPost(id),
  });

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery({
    queryKey: queryKeys.posts.comments(id),
    queryFn: () => fetchComments(id),
  });

  const deleteMutation = useMutation({
    mutationFn: (postId) => deletePost(postId),
  });

  if (isPostLoading) return <div>Loading...</div>;
  if (isPostError)
    return (
      <div>
        Error: {postError.message}
        <br />
        <Link to="/posts">Back to posts</Link>
      </div>
    );

  return (
    <div className="post-detail-container">
      <Link to="/posts" className="back-link">
        &larr; Back to posts
      </Link>
      <button
        onClick={() => deleteMutation.mutate(id)}
        disabled={deleteMutation.isPending}
      >
        Delete Post
      </button>
      {deleteMutation.isPending && <div>Deleting...</div>}
      {deleteMutation.isError && (
        <div>Error: {deleteMutation.error.message}</div>
      )}
      {deleteMutation.isSuccess && <div>Post deleted successfully</div>}
      <article className="post-content">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </article>

      <section className="comments-section">
        <h2>Comments</h2>
        {isCommentsLoading ? (
          <div>Loading comments...</div>
        ) : isCommentsError ? (
          <div>Failed to load comments</div>
        ) : (
          <ul className="comments-list">
            {comments.map((comment) => (
              <li key={comment.id} className="comment">
                <strong>{comment.name}</strong>
                <span className="comment-email">{comment.email}</span>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default PostDetail;
