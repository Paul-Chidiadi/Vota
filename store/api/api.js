import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../utils/config/baseUrl";
import { getDataFromLocalStorage } from "../../utils/localStorage";
import { setIsAuth, logOut } from "../slices/isAuthSlice";

// Define a base query with necessary configurations such as base URL and headers
const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    // Extract required information from the Redux store
    const accessToken = getDataFromLocalStorage("accessToken");
    const refreshToken = getDataFromLocalStorage("refreshToken");
    const email = getDataFromLocalStorage("email");

    // Attach authorization headers if accessToken is available
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
      headers.set("x-user-token", refreshToken);
      headers.set("x-user-email", email);
    }
    return headers;
  },
});

// Custom query function that handles token refreshing logic
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Check for 403 (Forbidden) or 401 (Unauthorized) errors in the response
  if (
    (result.error && result.error.status === 403) ||
    (result.error && result.error.status === 401)
  ) {
    // Attempt to refresh the access token
    const refreshResult = await baseQuery("auth/refreshToken", api, extraOptions);

    if (refreshResult.data) {
      // Update the Redux store with the new token
      api.dispatch(
        setIsAuth({
          isAuth: true,
          accessToken: refreshResult?.data?.accessToken,
          refreshToken: refreshResult?.data?.refreshToken,
          user: refreshResult?.data?.data,
        })
      );

      // Retry the initial query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Log out the user if token refresh fails
      api.dispatch(logOut());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "request",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Elector", "Electors", "Organization", "Organizations", "Events"],
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getElector: builder.query({
      query: (id) => `elector/${id}`,
      providesTags: ["Elector"],
    }),
    getAllElector: builder.query({
      query: (id) => `elector/getElector`,
      providesTags: ["Electors"],
    }),
    getOrganization: builder.query({
      query: (id) => `organization/${id}`,
      providesTags: ["Organization"],
    }),
    getAllOrganization: builder.query({
      query: (id) => `organization/getOrganization`,
      providesTags: ["Organizations"],
    }),
    getEvent: builder.query({
      query: (id) => `global/getEvent/${id}`,
      providesTags: ["Events"],
    }),
    sendData: builder.mutation({
      query: ({ url, data, type }) => ({
        url: url,
        method: type,
        body: data,
      }),
      invalidatesTags: ["Elector", "Electors", "Organization", "Organizations", "Events"],
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetElectorQuery,
  useGetAllElectorQuery,
  useGetOrganizationQuery,
  useGetAllOrganizationQuery,
  useGetEventQuery,
  useSendDataMutation,
} = api;
