import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../../app/store/configureStore';
import { BASE_URL } from '../../app/config';
import { UsersState, UserInfo } from './types';

const initialState: UsersState = {
  loading: false,
  error: null,
  hasFetched: false,
  allUsersInfo: [],
};

const USERS_URL = `${BASE_URL}/users`;

const usersListSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    fetchUsersInit(state) {
      state.loading = true;
      state.hasFetched = false;
      state.error = null;
    },
    fetchUsersSuccess(state, action: PayloadAction<UserInfo[]>) {
      state.loading = false;
      state.hasFetched = true;
      state.allUsersInfo = action.payload;
      state.error = null;
    },
    fetchUsersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetUsersState: () => initialState,
    updateUsersInit(state) {
      state.loading = true;
      state.error = null;
    },
    updateUsersSuccess(state, action: PayloadAction<UserInfo>) {
      state.loading = false;
      state.allUsersInfo = state.allUsersInfo.map((userInfo) =>
        userInfo.id !== action.payload.id ? userInfo : action.payload
      );
    },
    updateUsersFailure(state) {
      state.loading = false;
    },
  },
});

export const { reducer: usersReducer } = usersListSlice;

const {
  fetchUsersInit,
  fetchUsersSuccess,
  fetchUsersFailure,
  updateUsersSuccess,
  updateUsersFailure,
} = usersListSlice.actions;

export const usersSelector = (state: RootState) => state.users;

export const { resetUsersState } = usersListSlice.actions;
// it is not used, because the data shouldn't be reset due to the API not saving it

export const fetchUsers = () => async (dispatch: Dispatch) => {
  dispatch(fetchUsersInit());

  try {
    const { data } = await axios.get(USERS_URL);
    dispatch(fetchUsersSuccess(data));
  } catch (error: any) {
    dispatch(fetchUsersFailure(error));
  }
};

export const updateUsers =
  (userId: number, userData: UserInfo) => async (dispatch: Dispatch) => {
    try {
      await axios.put(`${USERS_URL}/${userId}`, userData);

      dispatch(updateUsersSuccess(userData));
    } catch (error) {
      dispatch(updateUsersFailure());
    }
  };
