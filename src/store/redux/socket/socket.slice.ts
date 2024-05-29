import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { socketSliceInitialState } from './socket.initialState';

export const socketSlice = createSlice({
  name: 'socket',
  initialState: socketSliceInitialState,
  reducers: {
    setConn: (state, action) => {
      state.conn = action.payload;
    },
  },
});


export const { setConn } = socketSlice.actions;
export const socketSliceActions = socketSlice.actions;
