import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { rtkQueryHandler } from '../api/rtkQueryHandler';
import { rtqApi } from '../api/rtqApi';
import { activeChatSlice } from './redux/activeChat/activeChat.slice';
import { doctorsSlice } from './redux/doctors/doctors.slice';
import { userSlice } from './redux/user/user.slice';
import { socketSlice } from './redux/socket/socket.slice';

const apis = [rtqApi];

const reducers = {
  [activeChatSlice.name]: activeChatSlice.reducer,
  [doctorsSlice.name]: doctorsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [socketSlice.name]: socketSlice.reducer
};

const createRootReducer = () =>
  combineReducers(
    apis.reduce(
      (storeReducers, api) => ({
        ...storeReducers,
        [api.reducerPath]: api.reducer,
      }),
      {
        ...reducers,
      }
    )
  );

export const store = configureStore({
  reducer: createRootReducer(),
  // @ts-expect-error some problem with middleware
  middleware: (getDefaultMiddleware) =>
    apis.reduce(
      // @ts-expect-error some problem with middleware
      (middlewares, api) => middlewares?.concat(api.middleware),
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(rtkQueryHandler)
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
