import { ITodo } from './../todos/TodosSlice';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Single API
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://jsonplaceholder.typicode.com/`,
  }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<ITodo[], void>({
      query: () => `/todos`,
      providesTags: ['Todos']
    }),
    createTodo: builder.mutation<ITodo, Omit<ITodo, "id">>({
      query: (body) => ({
        url: '/todos',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    }),
    updateTodo: builder.mutation<ITodo, Pick<ITodo, "id"> & Partial<ITodo>>({
      query: (body) => ({
        url: `/todos/${body.id}`,
        method: 'PUT',
        body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    }),
    deleteTodo: builder.mutation<void, Pick<ITodo, "id">>({
      query: (body) => ({
        url: `/todos/${body.id}`,
        method: 'DELETE',
      })
    })
  }),
});

export const { useGetTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = apiSlice;
