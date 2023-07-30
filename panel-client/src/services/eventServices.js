import axios from "axios";
import { API_BASEURL } from "../constants";
import { buildURLWithQueryParams } from "../utils";

export const getEvents = async (skip, limit) => {
  const url = buildURLWithQueryParams(`${API_BASEURL}/event`, {
    skip,
    limit,
  });
  const { data } = await axios.get(url);

  return data;
};

export const fetchEventById = async (id) => {
  const { data } = await axios.get(`${API_BASEURL}/event/${id}`);
  return data;
};

export const updateEventById = async (id, newInfo) => {
  const { data } = await axios.put(`${API_BASEURL}/event/${id}`, newInfo);
  return data;
};

export const deleteEventById = async (id) => {
  const { data } = await axios.delete(`${API_BASEURL}/event/${id}`);
  return data;
};

export const createEvent = async (event) => {
  const { data } = await axios.post(`${API_BASEURL}/event`, event);
  return data;
};
