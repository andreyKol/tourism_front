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
  }),
});

export const { useGetCountriesMutation } = countriesApi;
