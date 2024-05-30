/* eslint-disable camelcase */

import { rtqApi } from "../rtqApi";

export const usersApi = rtqApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.mutation({
      query: () => ({
        url: "/users/by/2",
        method: "GET",
      }),
    }),
    getClients: build.mutation({
      query: () => ({
        url: "/users/by/1",
        method: "GET",
      }),
    }),
    getMe: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    updateUser: build.mutation({
      query: (userData) => ({
        url: `/users/update/${userData.id}`,
        method: "PATCH",
        body: userData,
      }),
    }),
    updateImage: build.mutation({
      query: (userData) => ({
        url: `/users/image/${userData.ID}`,
        method: "POST",
        body: { file: userData.ImageFile },
      }),
    }),
    getImage: build.mutation({
      query: (id) => ({
        url: `/users/image/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUsersMutation,
  useGetClientsMutation,
  useGetMeMutation,
  useUpdateUserMutation,
  useUpdateImageMutation,
  useGetImageMutation,
} = usersApi;
