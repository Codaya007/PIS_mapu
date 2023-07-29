import axios from "axios";
import { API_BASEURL } from "../constants";

export const getAllNodes = async () => {
  const { data } = await axios.get(`${API_BASEURL}/node/coordinates`);
  
  return { nodes: data?.results };
};
