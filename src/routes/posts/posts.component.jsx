import "./posts.styles.scss";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../api";
import { queryKeys } from "../../utils/queryKeys";

const Post = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: queryKeys.posts.list(currentPage),
    queryFn: () => fetchPosts(currentPage + 1),
  });

  // replace with useQuery
  // const data = [];

  if(isLoading) return <div>Loading...</div>;
  if(isError) return <div>Error: {error.message}<br/>{error.stack}</div>;
  
  // 추가 안전장치: data가 배열인지 확인
  if(!data || !Array.isArray(data)) {
    return <div>No data available</div>;
  }
  
  // console.log(data);
  return (
    <div className="post-container">
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {/* {selectedPost && <PostDetail post={selectedPost} />} */}
    </div>
  );
};

export default Post;
