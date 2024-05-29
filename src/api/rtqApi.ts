import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtqApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/v1/',
  }),
  endpoints: () => ({}),
});

export const wsApi = createApi({
  reducerPath: 'wsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'ws://localhost:8080/api/v1/ws/',
  }),
  endpoints: () => ({}),
})