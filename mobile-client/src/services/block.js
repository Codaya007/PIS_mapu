import axios from "axios";
import { API_BASEURL } from "../constants";

export const getBlocks = async (populate = true) => {
  const { data } = await axios.get(`${API_BASEURL}/block?populate=${populate}`);

  return data;
};
