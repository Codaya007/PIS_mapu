import axios from "axios";
import { API_BASEURL } from "../constants";

export const getFaculties = async () => {
  const { data } = await axios.get(`${API_BASEURL}/faculty`);
  return data;
};
