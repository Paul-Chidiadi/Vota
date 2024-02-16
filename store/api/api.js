import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../utils/config/baseUrl";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  prepareHeaders: (headers, { getState }) => {
    // Extract required information from the Redux store
    const accessToken = getState().isAuth.accessToken;
    const refreshToken = getState().isAuth.refreshToken;
    const email = getState().isAuth.email;

    // Attach authorization headers if accessToken is available
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
      headers.set("x-user-token", refreshToken);
      headers.set("x-user-email", email);
    }
    return headers;
  },
  endpoints: (builder) => ({
    sendData: builder.mutation({
      query: ({ url, data, type }) => ({
        url: url,
        method: type,
        body: data,
      }),
      invalidatesTags: [],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const { useSendDataMutation } = api;
