import axios from "axios";

export const getUserAndToken = async (email, password) => {
  let responsePayload;
  try {
    const response = await axios.post(`${process.env.REACT_APP_TODO_API_URI}/v1/login`,{
      email, password
    });
    responsePayload = response?.data;
  } catch (e) {
    const serverMessage = e?.response?.data?.message
    throw new Error(serverMessage || "Unknown Error Occured")
  }
  if (!responsePayload?.success || !responsePayload?.data)
    throw new Error(
      responsePayload?.message || "Can't fetch user and token info"
    );
  return responsePayload?.data;
};

export const registerUser = async (name, email, password) => {
  let responsePayload;
  try {
    const response = await axios.post(`${process.env.REACT_APP_TODO_API_URI}/v1/signup`, {
      name,
      email,
      password,
    });
    responsePayload = response?.data;
  } catch (e) {
    const serverMessage = e?.response?.data?.message
    throw new Error(serverMessage || "Unknown Error Occured")
  }
  if (!responsePayload?.success)
    throw new Error(responsePayload?.message || "Unable to register new user");
};

export const getUserByToken = async (token) => {
  let responsePayload;
  try {
    const response = await axios.get(`${process.env.REACT_APP_TODO_API_URI}/v1/user`,{
      headers:{
        access_token: token
      }
    });
    responsePayload = response?.data;
  } catch (e) {
    const serverMessage = e?.response?.data?.message
    throw new Error(serverMessage || "Unknown Error Occured")
  }
  if (!responsePayload?.success || !responsePayload.data)
    throw new Error(responsePayload?.message || "Unable to fetch user");

  return responsePayload.data;
}