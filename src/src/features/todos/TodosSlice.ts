import { RootState } from './../../../store';
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ITodo {
    userId: number
    id: number | string;
    title: string;
    completed: boolean;
}


const initialState: { todos :ITodo[] } = {
    todos: []
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        getTodos: (state) => state,
        createTodo: (state, action: PayloadAction<ITodo>) => {
            state.todos.push(action.payload)
        },
        updateTodo: (state, action: PayloadAction<ITodo>) => {
            const index = state.todos.findIndex(t => t.id === action.payload.id);
            state.todos[index] = action.payload;
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(t => t.id !== action.payload);
        }
    }
})

export const { getTodos, createTodo, updateTodo, deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;
export const stateTodos = (state: RootState) => state.todos
