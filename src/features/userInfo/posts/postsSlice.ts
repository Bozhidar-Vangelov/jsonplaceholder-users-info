import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from 'antd';

import { PostsState, PostInfo } from './types';
import { RootState } from '../../../app/store/configureStore';
import { BASE_URL } from '../../../app/config';

const initialState: PostsState = {
  loading: false,
  error: null,
  allPostsInfo: [],
  hasFetched: false,
  postLoading: false,
  showPosts: false,
};

const POSTS_URL = `${BASE_URL}/posts`;

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
      state.showPosts = true;
      state.error = null;
    },
    fetchPostsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deletePostsInit(state) {
      state.postLoading = true;
      state.error = null;
    },
    deletePostSuccess(state, action: PayloadAction<number>) {
      state.loading = false;
      state.postLoading = false;
      state.allPostsInfo = state.allPostsInfo.filter(
        (post) => post.id !== action.payload
      );
    },
    deletePostFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.postLoading = false;
      state.error = action.payload;
    },
    updatePostsInit(state) {
      state.postLoading = true;
      state.error = null;
    },
    updatePostsSuccess(state, action: PayloadAction<PostInfo>) {
      state.loading = false;
      state.postLoading = false;
      state.allPostsInfo = state.allPostsInfo.map((post) =>
        post.id !== action.payload.id ? post : action.payload
      );
    },
    updatePostsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.postLoading = false;
      state.error = action.payload;
    },
    createPostInit(state) {
      state.postLoading = true;
      state.error = null;
    },
    createPostSuccess(state, action: PayloadAction<PostInfo>) {
      state.loading = false;
      state.postLoading = false;
      state.allPostsInfo.unshift(action.payload);
    },
    createPostFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.postLoading = false;
      state.error = action.payload;
    },
    setShowPostsState(state, action: PayloadAction<boolean>) {
      state.showPosts = action.payload;
    },
  },
});

export const { reducer: postsReducer } = postsSlice;

const {
  fetchPostsInit,
  fetchPostsSuccess,
  fetchPostsFailure,
  deletePostsInit,
  deletePostSuccess,
  deletePostFailure,
  updatePostsInit,
  updatePostsSuccess,
  updatePostsFailure,
  createPostInit,
  createPostSuccess,
  createPostFailure,
} = postsSlice.actions;

export const { setShowPostsState } = postsSlice.actions;

export const postsSelector = (state: RootState) => state.posts;

export const fetchPosts = () => async (dispatch: Dispatch) => {
  dispatch(fetchPostsInit());

  try {
    const { data } = await axios.get(POSTS_URL);

    dispatch(fetchPostsSuccess(data));
  } catch (error) {
    dispatch(fetchPostsFailure(error));
  }
};

export const deletePost = (postId: number) => async (dispatch: Dispatch) => {
  dispatch(deletePostsInit());
  try {
    await axios.delete(`${POSTS_URL}/${postId}/`);

    dispatch(deletePostSuccess(postId));

    notification.success({
      message: 'Post sucessfully deleted!',
      placement: 'bottomRight',
      className: 'notification-success',
    });
  } catch (error) {
    dispatch(deletePostFailure((error as Error).message));
    notification.error({
      message: 'Failed to delete the post!',
      placement: 'bottomRight',
      className: 'notification-error',
    });
  }
};

export const updatePosts =
  (postId: number, data: PostInfo, onFailureCallback: () => void) =>
  async (dispatch: Dispatch) => {
    dispatch(updatePostsInit());

    try {
      await axios.put(`${POSTS_URL}/${postId}`, data);

      dispatch(updatePostsSuccess(data));

      notification.success({
        message: 'Post sucessfully edited!',
        placement: 'bottomRight',
        className: 'notification-success',
      });
    } catch (error) {
      dispatch(updatePostsFailure((error as Error).message));
      onFailureCallback();
      notification.error({
        message: 'Failed to update the post!',
        placement: 'bottomRight',
        className: 'notification-error',
      });
    }
  };

export const createPost = (data: PostInfo) => async (dispatch: Dispatch) => {
  dispatch(createPostInit());

  try {
    await axios.post(POSTS_URL, data);

    dispatch(createPostSuccess(data));

    notification.success({
      message: 'Post successfully created!',
      placement: 'bottomRight',
      className: 'notification-success',
    });
  } catch (error) {
    dispatch(createPostFailure((error as Error).message));

    notification.error({
      message: 'Failed to create the post!',
      placement: 'bottomRight',
      className: 'notification-error',
    });
  }
};
