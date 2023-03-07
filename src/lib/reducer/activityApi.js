import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const activityApi = createApi({
  reducerPath: "ACTIVITY_API",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todo.api.devcode.gethired.id",
  }),
  tagTypes: ["ACTIVITY"],
  endpoints: (builder) => ({
    getActivity: builder.query({
      query: () => "/activity-groups?email=rioprayoga23@gmail.com",
      providesTags: ["ACTIVITY"],
    }),
    getOneActivity: builder.query({
      query: (id) => `/activity-groups/${id}`,
    }),
    createActivity: builder.mutation({
      query: (activity) => ({
        url: "/activity-groups",
        method: "POST",
        body: activity,
      }),
      invalidatesTags: ["ACTIVITY"],
    }),
    deleteActivity: builder.mutation({
      query: (id) => ({
        url: `/activity-groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ACTIVITY"],
    }),
    updateActivity: builder.mutation({
      query: ({ id, title }) => ({
        url: `/activity-groups/${id}`,
        method: "PATCH",
        body: { title },
      }),
      invalidatesTags: ["ACTIVITY"],
    }),
  }),
});

export const {
  useGetActivityQuery,
  useGetOneActivityQuery,
  useCreateActivityMutation,
  useDeleteActivityMutation,
  useUpdateActivityMutation,
} = activityApi;
