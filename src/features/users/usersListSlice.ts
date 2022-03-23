import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { Users, UserInfo } from './types';

const initialState: Users = {
  loading: true,
  error: '',
  allUsersInfo: [],
};

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

const usersListSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    fetchUsersSuccess(state, action) {
      state.loading = false;
      state.allUsersInfo = action.payload;
      state.error = '';
    },
    fetchUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetUsersState: () => initialState,
    updateUsersState(state, action) {
      state.loading = false;
      state.allUsersInfo = state.allUsersInfo.map((state) =>
        state.id !== action.payload.id ? state : action.payload
      );
    },
    fetchUsersState: (state) => {
      state.loading = false;
    },
  },
});

export const { reducer: usersReducer } = usersListSlice;

const { fetchUsersSuccess, fetchUsersFailure, updateUsersState } =
  usersListSlice.actions;
export const { resetUsersState, fetchUsersState } = usersListSlice.actions;

export const fetchUsers = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get(BASE_URL);

    dispatch(fetchUsersSuccess(data));
  } catch (error) {
    dispatch(fetchUsersFailure(error));
  }
};

export const updateUsers =
  (userId: number, data: {}) => async (dispatch: Dispatch) => {
    try {
      await axios.put(`${BASE_URL}/${userId}`, data);

      dispatch(updateUsersState(data));
    } catch (error) {
      console.log(error);
    }
  };
