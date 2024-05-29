import { createSlice } from '@reduxjs/toolkit';
import { themeInitialState } from './theme.inisialState';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: themeInitialState,
  reducers: {
    toggleTheme(state) {
      if (localStorage.getItem('theme') === 'light') {
        localStorage.setItem('theme', 'dark');
        state.theme = 'dark';
      } else {
        localStorage.setItem('theme', 'light');
        state.theme = 'light';
      }
    },
  },
});
export const { toggleTheme } = themeSlice.actions;
export const themeSliceActions = themeSlice.actions;
