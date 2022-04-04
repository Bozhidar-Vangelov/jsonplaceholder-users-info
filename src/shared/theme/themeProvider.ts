import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store/configureStore';

const initialState = {
  currentTheme: 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeState(state, action: PayloadAction<string>) {
      state.currentTheme = action.payload;
    },
  },
});

export const { setThemeState } = themeSlice.actions;

export const themeSelector = (state: RootState) => state.theme;

export const { reducer: themeReducer } = themeSlice;
