/* eslint-disable camelcase */

import { rtqApi } from '../rtqApi';

export const commonApi = rtqApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: ({ name, surname, email, phone, password }) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: {
          name,
          surname,
          email,
          phone,
          password,
          type: 0,
        },
      }),
    }),
    signIn: build.mutation({
      query: ({ phone, password }) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: {
          password,
          phone,
        },
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = commonApi;
