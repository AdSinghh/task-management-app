import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

export const addTodoItem = async (token, item) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_TODO_API_URI}/v1/createTodo`,
      { ...item },
      {
        headers: {
          access_token: token,
        },
      }
    );
  } catch (e) {
    const errorMessage = e?.response?.data.message || "Unkown Error Occured";
    throw new Error(errorMessage);
  }
};

export const getTodoList = async (token) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_TODO_API_URI}/v1/getTodos`,
      {
        headers: {
          access_token: token,
        },
      }
    );
    return response?.data?.data || [];
  } catch (e) {
    const errorMessage = e?.response?.data.message || "Unkown Error Occured";
    throw new Error(errorMessage);
  }
};

export const updateTodoItem = async (token, item) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_TODO_API_URI}/v1/updateTodo/${item._id}`,
      { 
        title: item.title,
        description: item.description,
        isDone: item.isDone
      },
      {
        headers: {
          access_token: token,
        },
      }
    );
  } catch (e) {
    const errorMessage = e?.response?.data.message || "Unkown Error Occured";
    throw new Error(errorMessage);
  }
};

export const deleteTodoItem = async (token, itemId) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_TODO_API_URI}/v1/deleteTodo/${itemId}`,
      {
        headers: {
          access_token: token,
        },
      }
    );
  } catch (e) {
    const errorMessage = e?.response?.data.message || "Unkown Error Occured";
    throw new Error(errorMessage);
  }
};
