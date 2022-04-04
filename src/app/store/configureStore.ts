import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../../features/users/usersListSlice';
import { postsReducer } from '../../features/userInfo/posts/postsSlice';
import { userReducer } from '../../features/userInfo/userInfoSlice';
import { themeReducer } from '../../shared/styles/theme/themeProviderSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    user: userReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
