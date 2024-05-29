import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

export const rtkQueryHandler: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { payload } = action;

    //@ts-ignore
    if (payload.status === 500 || payload.status === 400) {
      console.log('Error with 500/400');
    }
    console.log('Error with other code');
  }
  return next(action);
};
