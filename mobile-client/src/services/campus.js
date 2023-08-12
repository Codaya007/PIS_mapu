import axios from "axios";
import { API_BASEURL } from "../constants";

export const getCampus = async () => {
  const { data } = await axios.get(`${API_BASEURL}/campus`);

  return data;
};
