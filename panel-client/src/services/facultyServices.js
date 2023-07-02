import axios from "axios";
import { API_BASEURL } from "../constants";
import { buildURLWithQueryParams } from "../utils";

export const getFaculties = async (skip, limit) => {
  const url = buildURLWithQueryParams(`${API_BASEURL}/faculty`, {
    skip,
    limit,
  });

  const { data } = await axios.get(url);

  return data;
};

export const fetchFacultyById = async (id) => {
  const { data } = await axios.get(`${API_BASEURL}/faculty/${id}`);

  console.log({ data });

  return data;
};

export const updateFacultyById = async (id, newInfo) => {
  const { data } = await axios.put(`${API_BASEURL}/faculty/${id}`, newInfo);

  return data;
};

export const createFaculty = async (faculty) => {
  const { data } = await axios.post(`${API_BASEURL}/faculty`, faculty);

  return data;
};

export const deleteFacultyById = async (id) => {
  const { data } = await axios.delete(`${API_BASEURL}/faculty/${id}`);

  return data;
};
