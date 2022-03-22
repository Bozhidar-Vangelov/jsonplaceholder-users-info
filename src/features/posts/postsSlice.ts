import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { Posts } from './types';

const initialState: Posts = {
  loading: true,
  error: '',
  allPostsInfo: [],
};

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

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
    deletePost(state, action) {
      state.loading = false;
      state.allPostsInfo = action.payload;
    },
  },
});

export const { reducer: postsReducer } = postsSlice;

const { fetchPostsSuccess, fetchPostsFailure } = postsSlice.actions;

export const { deletePost } = postsSlice.actions;

export const fetchPosts =
  (userId: string | undefined) => async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${userId}/posts`);

      dispatch(fetchPostsSuccess(data));
    } catch (error) {
      dispatch(fetchPostsFailure(error));
    }
  };
