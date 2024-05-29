import { createSlice } from '@reduxjs/toolkit';
import { activeChatSliceInitialState } from './activeChat.initialState';

export const activeChatSlice = createSlice({
  name: 'activeChat',
  initialState: activeChatSliceInitialState,
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
  },
});

export const { setActiveChat } = activeChatSlice.actions;
export const activeChatSliceActions = activeChatSlice.actions;
