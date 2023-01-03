import React from "react";
import type { RootState } from "../../../store";
import { ITodo, stateTodos } from "./TodosSlice";
// import { useSelector } from "react-redux";
import { TodoItem } from "./TodoItem";
import { TodoForm } from "./TodoForm";
// import { useGetTodosQuery } from "../api/apiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { getTodos } from "../../services/apis";
import { useQuery } from "react-query";

export const Todos = () => {
  // const { todos } = useSelector(stateTodos);
  // const {
  //   data: todos,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  // } = useGetTodosQuery();
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery("todos", getTodos);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        {(error as FetchBaseQueryError).status} -{" "}
        {JSON.stringify((error as FetchBaseQueryError).data)}
      </div>
    );
  }

  return (
    <div>
      <TodoForm />
      {todos?.map((t: ITodo) => (
        <TodoItem
          key={t.id}
          title={t.title}
          id={t.id}
          completed={t.completed}
        />
      ))}
    </div>
  );
};
