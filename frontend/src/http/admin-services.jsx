import axios from "axios";

import {
  createTodos,
  deleteTodos,
  getAllTodos,
  getCompletionRates,
  updateTodos,
} from "../store/reducers";

export const adminServices = {
  getAllTodo: async (dispatch, query) => {
    const { page, rowsPerPage } = query;
    // console.log(query);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/todo?page=${page}&limit=${rowsPerPage}`
      );
      if (response) {
        dispatch(getAllTodos(response.data));
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getAllCompletionRate: async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/todo/day/rate"
      );
      if (response) {
        dispatch(getCompletionRates(response.data));
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteTodo: async (dispatch, id) => {
    // console.log(id);
    try {
      const url = `http://localhost:5000/api/v1/todo/${id}`;
      const response = await axios.delete(url);
      if (response) {
        // console.log(response);
        dispatch(deleteTodos(id));
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  updateTodo: async (dispatch, id, values) => {
    try {
      const url = `http://localhost:5000/api/v1/todo/${id}`;
      const response = await axios.patch(url, values);
      console.log("res", response);
      if (response) {
        dispatch(updateTodos(response.data));
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  createTodo: async (dispatch, values) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/todo`,
        values
      );

      if (response) {
        dispatch(createTodos(response.data));
        return Promise.resolve(response);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
