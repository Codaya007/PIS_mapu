import axios from "axios";
import { API_BASEURL } from "../constants";
import { buildURLWithQueryParams } from "../utils";

export const getUsers = async (skip, limit) => {
  const url = buildURLWithQueryParams(`${API_BASEURL}/user`, {
    skip,
    limit,
  });
  const { data } = await axios.get(url);

  return data;
};

export const fetchUserById = async (id) => {
  const { data } = await axios.get(`${API_BASEURL}/user/${id}`);
  return data;
};

export const updateUserById = async (id, newInfo) => {
  const { data } = await axios.put(`${API_BASEURL}/user/${id}`, newInfo);
  return data;
};

export const deleteUserById = async (id) => {
  const { data } = await axios.delete(`${API_BASEURL}/user/${id}`);
  return data;
};

export const createUser = async (user) => {
  const { data } = await axios.post(`${API_BASEURL}/user`, user);
  return data;
};

export const registerUser = async (user) => {
  const { data } = await axios.post(`${API_BASEURL}/auth/register`, user);
  return data;
};
