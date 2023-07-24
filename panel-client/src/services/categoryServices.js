import axios from "axios";
import { API_BASEURL } from "../constants";
import { buildURLWithQueryParams } from "../utils";

export const getCategories = async (skip, limit) => {
  const url = buildURLWithQueryParams(`${API_BASEURL}/category`, {
    skip,
    limit,
  });
  const { data } = await axios.get(url);

  return data;
};

export const fetchCategoryById = async (id) => {
  const { data } = await axios.get(`${API_BASEURL}/category/${id}`);
  return data;
};

export const updateCategoryById = async (id, newInfo) => {
  const { data } = await axios.put(`${API_BASEURL}/category/${id}`, newInfo);
  return data;
};

export const deleteCategoryById = async (id) => {
  const { data } = await axios.delete(`${API_BASEURL}/category/${id}`);
  return data;
};

export const createCategory = async (category) => {
  const { data } = await axios.post(`${API_BASEURL}/category`, category);
  return data;
};
