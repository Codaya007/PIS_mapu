import axios from "axios";
import { API_BASEURL } from "../constants";
import { buildURLWithQueryParams } from "../utils";

export const getRouteNodes = async (skip, limit) => {
  const url = buildURLWithQueryParams(`${API_BASEURL}/route-node`, {
    skip,
    limit,
  });

  const { data } = await axios.get(url);

  // console.log({ data });

  return data;
};

export const fetchInterestNodeById = async (id) => {
  const { data } = await axios.get(`${API_BASEURL}/route-node/${id}`);

  // console.log({ data });

  return data;
};

export const updateRouteNodeById = async (id, newInfo) => {
  const { data } = await axios.put(`${API_BASEURL}/route-node/${id}`, newInfo);

  return data;
};

export const createRouteNode = async (routeNode) => {
  const { data } = await axios.post(`${API_BASEURL}/route-node`, routeNode);

  return data;
};

export const deleteRouteNodeById = async (id) => {
  const { data } = await axios.delete(`${API_BASEURL}/route-node/${id}`);

  return data;
};
