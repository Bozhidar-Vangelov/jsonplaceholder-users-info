export interface PostsState {
  loading: boolean;
  error: null | string;
  allPostsInfo: PostInfo[];
  hasFetched: boolean;
}

export interface PostInfo {
  userId: number;
  id: number;
  title: string;
  body: string;
}
