import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  todos: [],
  todo: null,
  completionRate: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    getAllTodos: (state, action) => {
      return {
        ...state,
        todos: action.payload.data,
        result: action.payload.result,
        countType: action.payload.countType,
        total: action.payload.total,
      };
    },
    getCompletionRates: (state, action) => {
      return {
        ...state,
        completionRate: action.payload.data,
      };
    },
    deleteTodos: (state, action) => {
      return {
        ...state,
        total: state.total - 1,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    },
    updateTodos: (state, action) => {
      const todoList = [...state.todos];
      let index = todoList.findIndex(
        (todos) => todos.id === action.payload.updatedData.id
      );
      todoList[index] = action.payload.updatedData;
      return {
        ...state,
        todo: action.payload.updatedData,
        todos: todoList,
      };
    },
    createTodos: (state, action) => {
      return {
        ...state,
        total: state.total + 1,
        todo: action.payload.data,
        todos: [action.payload.data, ...state.todos],
      };
    },
    getCompletedStatus: (state, action) => {
      return {
        ...state,
        todos: action.payload.data,
        result: action.payload.result,
        total: action.payload.total,
      };
    },
  },
});

export const {
  getAllTodos,
  updateTodos,
  getCompletionRates,
  deleteTodos,
  createTodos,
  getCompletedStatus,
} = todoSlice.actions;

export default todoSlice.reducer;
