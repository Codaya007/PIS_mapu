import axios from "axios";
import { API_BASEURL } from "../constants";

export const deleteSubnodeById = async (id) => {
  const { data } = await axios.delete(`${API_BASEURL}/subnode/${id}`);
  return data;
};
