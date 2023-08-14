import axios from "axios";
import { API_BASEURL } from "../constants";
import { buildURLWithQueryParams } from "../utils";

export const getAccessNodes = async (skip, limit) => {
  const url = buildURLWithQueryParams(`${API_BASEURL}/access-node`, {
    skip,
    limit,
  });

  const { data } = await axios.get(url);

  // console.log({ data });

  return data;
};

export const fetchAccesNodeById = async (id) => {
  const { data } = await axios.get(`${API_BASEURL}/access-node/${id}`);

  // console.log({ data });

  return data;
};

export const updateAccessNodeById = async (id, newInfo) => {
  const { data } = await axios.put(`${API_BASEURL}/access-node/${id}`, newInfo);

  return data;
};

export const createAccessNode = async (accessNode) => {
  const { data } = await axios.post(`${API_BASEURL}/access-node`, accessNode);

  return data;
};

export const deleteAccessNodeById = async (id) => {
  const { data } = await axios.delete(`${API_BASEURL}/access-node/${id}`);

  return data;
};

export const masiveUploadAccessNodes = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axios.post(
    `${API_BASEURL}/access-node/upload`,
    formData
  );

  return data;
};
