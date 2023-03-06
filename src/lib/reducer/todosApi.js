import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const todosApi = createApi({
  reducerPath: "TODOS_API",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todo.api.devcode.gethired.id",
  }),
  tagTypes: ["TODOS"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (id) => `/todo-items?activity_group_id=${id}`,
      providesTags: ["TODOS"],
    }),
    createTodos: builder.mutation({
      query: (todo) => ({
        url: "todo-items",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["TODOS"],
    }),
    deleteTodos: builder.mutation({
      query: (id) => ({
        url: `/todo-items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TODOS"],
    }),
    updateTodos: builder.mutation({
      query: ({ id, is_active }) => ({
        url: `/todo-items/${id}`,
        method: "PATCH",
        body: { is_active },
      }),
      invalidatesTags: ["TODOS"],
    }),
    updateTodosTitle: builder.mutation({
      query: ({ id, title, priority }) => ({
        url: `/todo-items/${id}`,
        method: "PATCH",
        body: { title, priority },
      }),
      invalidatesTags: ["TODOS"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodosMutation,
  useDeleteTodosMutation,
  useUpdateTodosMutation,
  useUpdateTodosTitleMutation,
} = todosApi;
