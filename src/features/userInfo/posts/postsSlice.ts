import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from 'antd';

import { PostsState, PostInfo } from './types';

const initialState: PostsState = {
  loading: false,
  error: null,
  allPostsInfo: [],
  hasFetched: false,
};

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    fetchPostsInit(state) {
      state.loading = true;
      state.hasFetched = false;
      state.error = null;
    },
    fetchPostsSuccess(state, action: PayloadAction<PostInfo[]>) {
      state.loading = false;
      state.allPostsInfo = action.payload;
      state.hasFetched = true;
      state.error = '';
    },
    fetchPostsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deletePostSuccess(state, action: PayloadAction<number>) {
      state.loading = false;
      state.allPostsInfo = state.allPostsInfo.filter(
        (post) => post.id !== action.payload
      );
    },
    deletePostFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePostsSuccess(state, action: PayloadAction<PostInfo>) {
      state.loading = false;
      state.allPostsInfo = state.allPostsInfo.map((post) =>
        post.id !== action.payload.id ? post : action.payload
      );
    },
    updatePostsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createPostSuccess(state, action: PayloadAction<PostInfo>) {
      state.loading = false;
      state.allPostsInfo.unshift(action.payload);
    },
    createPostFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { reducer: postsReducer } = postsSlice;

const {
  fetchPostsInit,
  fetchPostsSuccess,
  fetchPostsFailure,
  deletePostSuccess,
  deletePostFailure,
  updatePostsSuccess,
  updatePostsFailure,
  createPostSuccess,
  createPostFailure,
} = postsSlice.actions;

export const fetchPosts = () => async (dispatch: Dispatch) => {
  dispatch(fetchPostsInit());

  try {
    const { data } = await axios.get(BASE_URL);

    dispatch(fetchPostsSuccess(data));
  } catch (error) {
    dispatch(fetchPostsFailure(error));
  }
};

export const deletePost = (postId: number) => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/${postId}/`);

    dispatch(deletePostSuccess(postId));

    notification.success({
      message: 'Post sucessfully deleted!',
      placement: 'bottomRight',
      className: 'notification-success',
    });
  } catch (error: any) {
    dispatch(deletePostFailure(error));
    notification.error({
      message: 'Failed to delete the post!',
      placement: 'bottomRight',
      className: 'notification-error',
    });
  }
};

export const updatePosts =
  (postId: number, data: PostInfo) => async (dispatch: Dispatch) => {
    try {
      await axios.put(`${BASE_URL}/${postId}`, data);

      dispatch(updatePostsSuccess(data));

      notification.success({
        message: 'Post sucessfully edited!',
        placement: 'bottomRight',
        className: 'notification-success',
      });
    } catch (error: any) {
      dispatch(updatePostsFailure(error));

      notification.error({
        message: 'Failed to update the post!',
        placement: 'bottomRight',
        className: 'notification-error',
      });
    }
  };

export const createPost = (data: PostInfo) => async (dispatch: Dispatch) => {
  try {
    await axios.post(BASE_URL, data);

    dispatch(createPostSuccess(data));

    notification.success({
      message: 'Post successfully created!',
      placement: 'bottomRight',
      className: 'notification-success',
    });
  } catch (error: any) {
    dispatch(createPostFailure(error));

    notification.error({
      message: 'Failed to create the post!',
      placement: 'bottomRight',
      className: 'notification-error',
    });
  }
};
