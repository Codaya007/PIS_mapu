import axios from "axios";
import { API_BASEURL } from "../constants";
import { buildURLWithQueryParams } from "../utils";

export const getCampuses = async (skip, limit) => {
  const url = buildURLWithQueryParams(`${API_BASEURL}/campus`, {
    skip,
    limit,
  });
  const { data } = await axios.get(url);

  return data;
};

export const fetchCampusById = async (id) => {
  const { data } = await axios.get(`${API_BASEURL}/campus/${id}`);
  return data;
};

export const updateCampusById = async (id, newInfo) => {
  const { data } = await axios.put(`${API_BASEURL}/campus/${id}`, newInfo);
  return data;
};

export const deleteCampusById = async (id) => {
  const { data } = await axios.delete(`${API_BASEURL}/campus/${id}`);
  return data;
};

export const createCampus = async (campus) => {
  const { data } = await axios.post(`${API_BASEURL}/campus`, campus);
  return data;
};
