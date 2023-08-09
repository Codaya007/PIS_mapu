import axios from "axios";
import { API_BASEURL } from "../constants";

export const getInterestingNodesByStringSearch = async (search) => {
  const { data } = await axios.get(
    `${API_BASEURL}/interesting-node?search=${search}`
  );

  return data?.results;
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
