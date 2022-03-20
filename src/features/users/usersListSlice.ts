import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { Users } from './types';

const initialState: Users = {
  loading: false,
  error: '',
  userInfo: [],
};

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

const usersListSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    fetchUsersInit(state) {
      state.loading = true;
    },
    fetchUsersSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = '';
    },
    fetchUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetUserState: () => initialState,
  },
});

export const { reducer: usersReducer } = usersListSlice;

const { fetchUsersInit, fetchUsersSuccess, fetchUsersFailure } =
  usersListSlice.actions;

export const resetUserState = usersListSlice.actions.resetUserState;

export const fetchUsers = () => async (dispatch: Dispatch) => {
  dispatch(fetchUsersInit());

  try {
    const { data } = await axios.get(BASE_URL);

    dispatch(fetchUsersSuccess(data));
  } catch (error) {
    dispatch(fetchUsersFailure(error));
  }
};
