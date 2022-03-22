export interface Posts {
  loading: boolean;
  error: string;
  allPostsInfo: PostInfo[];
}

export interface PostInfo {
  userId: number;
  id: number;
  title: string;
  body: string;
}
