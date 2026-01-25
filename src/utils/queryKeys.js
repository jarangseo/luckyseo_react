/**
 * React Query의 queryKey를 중앙에서 관리하는 파일
 * 
 * 사용법:
 * - 기본 키: queryKeys.posts.all
 * - 동적 키: queryKeys.posts.detail(postId)
 * - 페이지별: queryKeys.posts.list(page)
 */

export const queryKeys = {
  // Posts 관련
  posts: {
    // 모든 게시글 목록
    all: ["posts"],
    
    // 페이지별 게시글 목록
    lists: () => [...queryKeys.posts.all, "list"],
    list: (page) => [...queryKeys.posts.lists(), page],
    
    // 특정 게시글
    details: () => [...queryKeys.posts.all, "detail"],
    detail: (id) => [...queryKeys.posts.details(), id],
    
    // 게시글의 댓글
    comments: (postId) => [...queryKeys.posts.detail(postId), "comments"],
  },

  // Users 관련 (예시)
  users: {
    all: ["users"],
    lists: () => [...queryKeys.users.all, "list"],
    list: (filters) => [...queryKeys.users.lists(), filters],
    details: () => [...queryKeys.users.all, "detail"],
    detail: (id) => [...queryKeys.users.details(), id],
  },

  // Comments 관련 (예시)
  comments: {
    all: ["comments"],
    lists: () => [...queryKeys.comments.all, "list"],
    list: (postId) => [...queryKeys.comments.lists(), postId],
    details: () => [...queryKeys.comments.all, "detail"],
    detail: (id) => [...queryKeys.comments.details(), id],
  },
};
