import axios from "axios";
import { API_BASEURL } from "../constants";

export const getRoles = async () => {
  const { data } = await axios.get(`${API_BASEURL}/role`);

  return data;
};
