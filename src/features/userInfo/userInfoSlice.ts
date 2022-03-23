import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { User, UserInfo } from './types';

const initialState: User = {
  loading: true,
  error: '',
  userInfo: {} as UserInfo,
};

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = '';
    },
    fetchUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetUserState: () => initialState,
    updateUserState(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
    },
    fetchUserState: (state) => {
      state.loading = false;
    },
  },
});

export const { reducer: userReducer } = userSlice;

const { fetchUserSuccess, fetchUserFailure } = userSlice.actions;
export const { resetUserState, updateUserState, fetchUserState } =
  userSlice.actions;

export const fetchUser =
  (userId: string | undefined) => async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${userId}`);

      dispatch(fetchUserSuccess(data));
    } catch (error) {
      dispatch(fetchUserFailure(error));
    }
  };

export const updateUser =
  (userId: number, data: UserInfo) => async (dispatch: Dispatch) => {
    try {
      await axios.put(`${BASE_URL}/${userId}`, data);

      dispatch(updateUserState(data));
    } catch (error) {
      console.log(error);
    }
  };
