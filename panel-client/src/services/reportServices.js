import axios from "axios";
import { API_BASEURL } from "../constants";
import { buildURLWithQueryParams } from "../utils";

export const getReports = async (skip, limit) => {
  const url = buildURLWithQueryParams(`${API_BASEURL}/report`, {
    skip,
    limit,
  });

  const { data } = await axios.get(url);

  return data;
};

export const fetchReportById = async (id) => {
  const { data } = await axios.get(`${API_BASEURL}/report/${id}`);

  console.log({ data });

  return data;
};

export const updateReportById = async (id, newInfo) => {
  const { data } = await axios.put(`${API_BASEURL}/report/${id}`, newInfo);

  return data;
};

export const deleteReportById = async (id) => {
  const { data } = await axios.delete(`${API_BASEURL}/report/${id}`);

  return data;
};
