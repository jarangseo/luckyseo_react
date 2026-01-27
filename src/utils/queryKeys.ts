export const queryKeys = {
  posts: {
    all: ["posts"] as const,
    list: (page: number) => ["posts", "list", page] as const,
    detail: (id: number) => ["posts", "detail", id] as const,
    comments: (postId: number) => ["posts", "comments", postId] as const,
  },
};
