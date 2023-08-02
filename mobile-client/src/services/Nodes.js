import axios from "axios";
import { API_BASEURL } from "../constants";

export const getAllNodes = async () => {
  const { data } = await axios.get(`${API_BASEURL}/node/coordinates`);

  return { nodes: data?.results };
};

export const findNearestRoute = async (node) => {
  console.log(node);
  try {
    const { data } = await axios.post(`${API_BASEURL}/route`, node);
    return data;
  } catch (error) {
    console.log(`error ${error}`);
  }
};
