import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../../features/users/usersListSlice';
import { postsReducer } from '../../features/userInfo/posts/postsSlice';
import { userReducer } from '../../features/userInfo/userInfoSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
