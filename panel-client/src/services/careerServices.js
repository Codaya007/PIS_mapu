import axios from "axios";
import { API_BASEURL } from "../constants";
import { buildURLWithQueryParams } from "../utils";

export const getCareers = async (skip, limit) => {
  const url = buildURLWithQueryParams(`${API_BASEURL}/career`, {
    skip,
    limit,
  });
  const { data } = await axios.get(url);

  return data;
};

export const fetchCareerById = async (id) => {
  const { data } = await axios.get(`${API_BASEURL}/career/${id}`);
  return data;
};

export const updateCareerById = async (id, newInfo) => {
  const { data } = await axios.put(`${API_BASEURL}/career/${id}`, newInfo);
  return data;
};

export const deleteCareerById = async (id) => {
  const { data } = await axios.delete(`${API_BASEURL}/career/${id}`);
  return data;
};

export const createCareer = async (career) => {
  const { data } = await axios.post(`${API_BASEURL}/career`, career);
  return data;
};
