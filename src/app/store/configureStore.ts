import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../../features/users/usersListSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
