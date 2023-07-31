import axios from "axios";
import { API_BASEURL } from "../constants";
import { buildURLWithQueryParams } from "../utils";

export const getComments = async (skip, limit, populate) => {
  const url = buildURLWithQueryParams(`${API_BASEURL}/comment`, {
    skip,
    limit,
    populate,
  });
  const { data } = await axios.get(url);

  return data;
};

export const fetchCommentById = async (id) => {
  const { data } = await axios.get(`${API_BASEURL}/comment/${id}`);
  return data;
};

export const updateCommentById = async (id, newInfo) => {
  const { data } = await axios.put(`${API_BASEURL}/comment/${id}`, newInfo);
  return data;
};

export const deleteCommentById = async (id) => {
  const { data } = await axios.delete(`${API_BASEURL}/comment/${id}`);
  return data;
};

export const createComment = async (comment) => {
  const { data } = await axios.post(`${API_BASEURL}/comment`, comment);
  return data;
};
