import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { Users } from './types';

const initialState: Users = {
  loading: false,
  error: '',
  userInfo: [],
};

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    fetchUserInit(state) {
      state.loading = true;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = '';
    },
    fetchUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { reducer: usersReducer } = usersSlice;

export const { fetchUserInit, fetchUserSuccess, fetchUserFailure } =
  usersSlice.actions;

export const fetchUser = () => async (dispatch: Dispatch) => {
  dispatch(fetchUserInit());

  try {
    const { data } = await axios.get(BASE_URL);

    dispatch(fetchUserSuccess(data));
  } catch (error) {
    dispatch(fetchUserFailure(error));
  }
};
