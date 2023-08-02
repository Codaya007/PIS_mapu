import axios from "axios";
import { API_BASEURL } from "../constants";

export const getAllNodes = async () => {
  const { data } = await axios.get(`${API_BASEURL}/node/coordinates`);
  // console.log(data);
  return { nodes: data?.results };
};

export const findNearestRoute = async (node) => {
  try {
    const { data } = await axios.post(`${API_BASEURL}/route`, node);
    console.log(data);
    return data;
  } catch (error) {
    console.log(`eeerror ${error}`);
  }
};
