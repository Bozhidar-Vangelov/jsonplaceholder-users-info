import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from 'antd';

import { BASE_URL } from '../../app/config';
import { UserState, UserInfo } from './types';
import { RootState } from '../../app/store/configureStore';

const initialState: UserState = {
  loading: false,
  error: null,
  userInfo: {} as UserInfo,
  hasFetched: false,
};

const USERS_URL = `${BASE_URL}/users`;

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    fetchUserInit(state) {
      state.loading = true;
      state.hasFetched = false;
      state.error = null;
    },
    fetchUserSuccess(state, action: PayloadAction<UserInfo>) {
      state.loading = false;
      state.userInfo = action.payload;
      state.hasFetched = true;
      state.error = null;
    },
    fetchUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetUserState: () => initialState,
    updateUserInit(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state, action: PayloadAction<UserInfo>) {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    updateUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { reducer: userReducer } = userSlice;

const {
  fetchUserInit,
  fetchUserSuccess,
  fetchUserFailure,
  updateUserInit,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;
export const { resetUserState } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export const fetchUser = (userId?: string) => async (dispatch: Dispatch) => {
  dispatch(fetchUserInit());

  try {
    const { data } = await axios.get(`${USERS_URL}/${userId}`);

    dispatch(fetchUserSuccess(data));
  } catch (error) {
    dispatch(fetchUserFailure((error as Error).message));
  }
};

export const updateUser =
  (userId: number, data: UserInfo) => async (dispatch: Dispatch) => {
    dispatch(updateUserInit());
    try {
      await axios.put(`${USERS_URL}/${userId}`, data);

      dispatch(updateUserSuccess(data));

      notification.success({
        message: "User's data successfully saved!",
        placement: 'bottomRight',
        className: 'notification-success',
        duration: 5000,
      });
    } catch (error) {
      dispatch(updateUserFailure((error as Error).message));

      notification.error({
        message: "Failed to save user's data!",
        placement: 'bottomRight',
        className: 'notification-error',
      });
    }
  };
