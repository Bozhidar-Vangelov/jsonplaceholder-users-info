import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { Posts } from './types';

const initialState: Posts = {
  loading: true,
  error: '',
  allPostsInfo: [],
};

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    fetchPostsSuccess(post, action) {
      post.loading = false;
      post.allPostsInfo = action.payload;
      post.error = '';
    },
    fetchPostsFailure(post, action) {
      post.loading = false;
      post.error = action.payload;
    },
    deletePostSuccess(post, action) {
      post.loading = false;

      post.allPostsInfo = post.allPostsInfo.filter(
        (post) => post.id !== action.payload
      );
    },
    deletePostFailure(post, action) {
      post.loading = false;
      post.error = action.payload;
    },
    updatePostsStateSuccess(post, action) {
      post.loading = false;
      post.allPostsInfo = post.allPostsInfo.map((post) =>
        post.id !== action.payload.id ? post : action.payload
      );
    },
    updatePostsStateFailure(post, action) {
      post.loading = false;
      post.error = action.payload;
    },
  },
});

export const { reducer: postsReducer } = postsSlice;

const {
  fetchPostsSuccess,
  fetchPostsFailure,
  deletePostSuccess,
  deletePostFailure,
  updatePostsStateSuccess,
  updatePostsStateFailure,
} = postsSlice.actions;

export const fetchPosts = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get(BASE_URL);

    dispatch(fetchPostsSuccess(data));
  } catch (error) {
    dispatch(fetchPostsFailure(error));
  }
};

export const deletePost = (postId: number) => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/${postId}`);

    dispatch(deletePostSuccess(postId));
  } catch (error) {
    dispatch(deletePostFailure);
  }
};

export const updatePosts =
  (postId: number, data: {}) => async (dispatch: Dispatch) => {
    try {
      await axios.put(`${BASE_URL}/${postId}`);

      dispatch(updatePostsStateSuccess(data));
    } catch (error) {
      dispatch(updatePostsStateFailure);
    }
  };
