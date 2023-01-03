import { ITodo } from './../features/todos/TodosSlice';
import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 2000,
  headers: {
    "Content-type": "application/json",
  },
});


export const getTodos = () => instance.get(`/todos`).then(response => response.data)
export const createTodo = (body: Omit<ITodo, "id">) => instance.post(`/todos`, body).then(response => response.data)
export const updateTodo = (body: ITodo) => instance.put(`/todos/${body.id}`, body).then(response => response.data)
export const deleteTodo = (body: Pick<ITodo, "id">) => instance.delete(`/todos/${body.id}`).then(response => response.data)
