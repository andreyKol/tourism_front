/* eslint-disable camelcase */

import { makeid } from '../../utils/makeRandomId';
import { rtqApi, wsApi } from '../rtqApi';

export const chatsApi = rtqApi.injectEndpoints({
  endpoints: (build) => ({
    createRoom: build.mutation({
      query: () => ({
        url: '/ws/createRoom',
        method: 'POST',
        body: {
          id: makeid(10),
        },
      }),
    }),
    getChats: build.mutation({
      query: (userId) => ({
        url: `/ws/getRooms/ByClientID?clientId=${userId}`,
        method: 'GET',
      }),
    }),
    getUsersByChat: build.mutation({
      query: (chatId) => ({
        url: `/ws/getClients/ByRoomID/${chatId}`,
        method: 'GET',
      }),
    }),
    getMessages: build.mutation({
      query: (chatId) => ({
        url: `/ws/getMessages/ByRoomID/${chatId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const wsChatsApi = wsApi.injectEndpoints({
  endpoints: (build) => ({
    joinRoom: build.mutation({
      query: ({ roomId, userId }) => ({
        url: `/ws/joinRoom/${roomId}/?clientId=${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateRoomMutation, useGetChatsMutation, useGetUsersByChatMutation, useGetMessagesMutation } =
  chatsApi;
export const { useJoinRoomMutation } = wsChatsApi;
