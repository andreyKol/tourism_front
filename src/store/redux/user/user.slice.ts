import { createSlice } from '@reduxjs/toolkit';
import { userSliceInitialState } from './user.initialState';

export const userSlice = createSlice({
  name: 'user',
  initialState: userSliceInitialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userSliceActions = userSlice.actions;
