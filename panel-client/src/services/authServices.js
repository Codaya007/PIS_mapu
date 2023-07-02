import axios from "axios";
import { API_BASEURL } from "../constants";

export const loginUser = async (email, password) => {
  const { data } = await axios.post(`${API_BASEURL}/auth/login`, {
    email,
    password,
  });

  return data;
};

export const getProfile = async () => {
  const { data } = await axios.get(`${API_BASEURL}/me`);

  return data;
};

export const putProfile = async (newInfo) => {
  await axios.put(`${API_BASEURL}/me`, newInfo);

  return true;
};
