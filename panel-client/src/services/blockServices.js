import axios from "axios";
import { API_BASEURL } from "../constants";
import { buildURLWithQueryParams } from "../utils";

export const getBlocks = async (skip, limit) => {
  const url = buildURLWithQueryParams(`${API_BASEURL}/block`, {
    skip,
    limit,
  });

  const { data } = await axios.get(url);

  return data;
};

export const fetchBlockById = async (id) => {
  const { data } = await axios.get(`${API_BASEURL}/block/${id}`);

  console.log({ data });

  return data;
};

export const updateBlockById = async (id, newInfo) => {
  const { data } = await axios.put(`${API_BASEURL}/block/${id}`, newInfo);

  return data;
};

export const createBlock = async (block) => {
  const { data } = await axios.post(`${API_BASEURL}/block`, block);

  return data;
};

export const deleteBlockById = async (id) => {
  const { data } = await axios.delete(`${API_BASEURL}/block/${id}`);

  return data;
};
