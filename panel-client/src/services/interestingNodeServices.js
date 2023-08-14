import axios from "axios";
import { API_BASEURL } from "../constants";
import { buildURLWithQueryParams } from "../utils";

export const getInterestingNodes = async (skip, limit) => {
  const url = buildURLWithQueryParams(`${API_BASEURL}/interesting-node`, {
    skip,
    limit,
  });

  const { data } = await axios.get(url);

  return data;
};

export const fetchInterestNodeById = async (id) => {
  const { data } = await axios.get(`${API_BASEURL}/interesting-node/${id}`);

  // console.log({ data });

  return data;
};

export const updateInterestingNodeById = async (id, newInfo) => {
  const { data } = await axios.put(
    `${API_BASEURL}/interesting-node/${id}`,
    newInfo
  );

  return data;
};

export const createInterestingNode = async (interestingNode) => {
  const { data } = await axios.post(
    `${API_BASEURL}/interesting-node`,
    interestingNode
  );

  return data;
};

export const deleteInterestingNodeById = async (id) => {
  const { data } = await axios.delete(`${API_BASEURL}/interesting-node/${id}`);

  return data;
};

export const masiveUploadInterestingNodes = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axios.post(
    `${API_BASEURL}/interesting-node/upload`,
    formData
  );

  return data;
};
