import React, { SyntheticEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { ITodo /*createTodo*/ } from "./TodosSlice";
import { useDispatch } from "react-redux";
import { useCreateTodoMutation } from "../api/apiSlice";
import { useMutation } from "react-query";
import { createTodo } from "../../services/apis";

export const TodoForm = () => {
  const [title, setTitle] = useState("");
  /* Redux */
  // const dispatch = useDispatch();
  /* RTK Query */
  // const [createTodo, result] = useCreateTodoMutation();
  /* React Query */
  const {
    mutate: createTodoFunc,
    isLoading,
    isError,
    isSuccess,
    data,
  } = useMutation(createTodo);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newTodo: Omit<ITodo, "id"> = {
      userId: 1,
      title: title,
      completed: false,
    };
    // dispatch(createTodo(newTodo));
    // createTodo(newTodo);
    createTodoFunc(newTodo);
    setTitle("");
  };

  return (
    <form onSubmit={onSubmit}>
      {isSuccess ? <div>Todo added! - {JSON.stringify(data)}</div> : null}
      <div className="flex flex-row">
        <label className="w-full block mr-3">
          <span className="block text-lg">Title:</span>
          <input
            className="border border-black w-100 p-2  rounded w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
        </label>
        <button
          className="border border-black bg-black text-white p-2 px-3 rounded shrink-0"
          type="submit"
        >
          Create Todo
        </button>
      </div>
    </form>
  );
};
