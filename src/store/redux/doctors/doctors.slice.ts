import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { usersSliceInitialState } from './doctors.initialState';
import { useGetUsersMutation } from '../../../api/users/usersApi';

export const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: usersSliceInitialState,
  reducers: {
    setDoctors: (state, action) => {
      state.doctors = action.payload;
    },
  },
});


export const { setDoctors } = doctorsSlice.actions;
export const usersSliceActions = doctorsSlice.actions;
