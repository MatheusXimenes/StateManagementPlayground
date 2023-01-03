import React from "react";
import { ITodo /*deleteTodo, updateTodo*/ } from "./TodosSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { updateTodo, deleteTodo } from "../../services/apis";
import { useMutation } from "react-query";
// import { useUpdateTodoMutation, useDeleteTodoMutation } from "../api/apiSlice";
// import { useDispatch } from "react-redux";

export const TodoItem = ({ id, title, completed }: Omit<ITodo, "userId">) => {
  /* Redux */
  // const dispatch = useDispatch();

  /* RTK */
  // const [updateTodo, resultUpdate] = useUpdateTodoMutation();
  // const [deleteTodo, resultDelete] = useDeleteTodoMutation();

  /* React Query */
  const {
    mutate: updateTodoFunc,
    isSuccess: isSuccessUpdated,
    data: updatedData,
  } = useMutation(updateTodo);
  const {
    mutate: deleteTodoFunc,
    isSuccess: isSuccessDeleted,
    data: deletedData,
  } = useMutation(deleteTodo);

  function handleCompleteTodo() {
    const newTodo: ITodo = {
      userId: 1,
      id: id,
      title: title,
      completed: !completed,
    };
    // dispatch(updateTodo(newTodo));
    // updateTodo(newTodo);
    updateTodoFunc(newTodo);
  }

  function handleDeleteTodo() {
    // dispatch(deleteTodo(id));
    // deleteTodo({ id });
    deleteTodoFunc({ id });
  }

  return (
    <div className="my-2 py-2 px-2 border-2 flex border-l-8 border-green-100">
      {isSuccessDeleted ? (
        <div> Deleted {JSON.stringify(deletedData)}</div>
      ) : null}

      {isSuccessUpdated ? (
        <div> Updated {JSON.stringify(updatedData)}</div>
      ) : null}
      <input
        className="mr-2"
        onChange={handleCompleteTodo}
        type="checkbox"
        checked={completed}
      />
      <p className={completed ? `line-through` : ``}>{title}</p>
      <button onClick={handleDeleteTodo} className="ml-auto">
        <FontAwesomeIcon icon={faRectangleXmark} />
      </button>
    </div>
  );
};
