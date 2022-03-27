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
        (post) => post.id !== action.payload
      );
    },
    deletePostFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePostsStateSuccess(state, action) {
      state.loading = false;
      state.allPostsInfo = state.allPostsInfo.map((post) =>
        post.id !== action.payload.id ? post : action.payload
      );
    },
    updatePostsStateFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createPostSuccess(state, action) {
      state.loading = false;
      state.allPostsInfo.unshift(action.payload);
    },
    createPostFailure(state, action) {
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
  createPostSuccess,
  createPostFailure,
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
      await axios.put(`${BASE_URL}/${postId}`, data);

      dispatch(updatePostsStateSuccess(data));
    } catch (error) {
      dispatch(updatePostsStateFailure);
    }
  };

export const createPost =
  (data: { userId: number; title: string; body: string }) =>
  async (dispatch: Dispatch) => {
    try {
      await axios.post(BASE_URL, data);

      dispatch(createPostSuccess(data));
    } catch (error) {
      dispatch(createPostFailure);
    }
  };
