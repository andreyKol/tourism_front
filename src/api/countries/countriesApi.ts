/* eslint-disable camelcase */

import { rtqApi } from "../rtqApi";

export const countriesApi = rtqApi.injectEndpoints({
  endpoints: (build) => ({
    getCountries: build.mutation({
      query: () => ({
        url: "/countries",
        method: "GET",
      }),
    }),
    getCountryById: build.mutation({
      query: (id) => ({
        url: `/countries/${id}`,
        method: "GET",
      }),
    }),
    getEvents: build.mutation({
      query: (id) => ({
        url: `/events/by/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCountriesMutation,
  useGetCountryByIdMutation,
  useGetEventsMutation,
} = countriesApi;
