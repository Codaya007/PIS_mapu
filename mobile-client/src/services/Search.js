import axios from "axios";
import { API_BASEURL } from "../constants";

export const getSearchString = async (search) => {
  const { data } = await axios.get(`${API_BASEURL}/search?search=${search}`);

  return data;
};

export const getShortestPath = async (
  type = "byNode",
  origin,
  destination,
  nomenclature
) => {
  const { data } = await axios.post(`${API_BASEURL}/route`, {
    type,
    origin,
    destination,
    nomenclature,
  });

  return data;
};
