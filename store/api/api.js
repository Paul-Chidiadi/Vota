import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `user/${id}`,
    }),
    getPosts: builder.query({
      query: () => "posts",
    }),
    // Add more endpoints as needed
  }),
});

export const { useGetUserQuery, useGetPostsQuery } = api;
