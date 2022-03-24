import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { Posts } from './types';

const initialState: Posts = {
  loading: true,
  error: '',
  allPostsInfo: [],
};

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    fetchPostsSuccess(state, action) {
      state.loading = false;
      state.allPostsInfo = action.payload;
      state.error = '';
    },
    fetchPostsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deletePostSuccess(state, action) {
      state.loading = false;

      state.allPostsInfo = state.allPostsInfo.filter(
        (state) => state.id !== action.payload
      );
    },
    deletePostFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePostsStateSuccess(state, action) {
      state.loading = false;
      state.allPostsInfo = state.allPostsInfo.map((state) =>
        state.id !== action.payload.id ? state : action.payload
      );
    },
    updatePostsStateFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
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

export const fetchPosts =
  (userId: string | undefined) => async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/users/${userId}/posts`);

      dispatch(fetchPostsSuccess(data));
    } catch (error) {
      dispatch(fetchPostsFailure(error));
    }
  };

export const deletePost = (postId: number) => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/posts/${postId}`);

    dispatch(deletePostSuccess(postId));
  } catch (error) {
    dispatch(deletePostFailure);
  }
};

export const updatePosts =
  (postId: number, data: {}) => async (dispatch: Dispatch) => {
    try {
      await axios.put(`${BASE_URL}/posts/${postId}`);

      dispatch(updatePostsStateSuccess(data));
    } catch (error) {
      dispatch(updatePostsStateFailure);
    }
  };
