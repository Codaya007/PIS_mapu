import axios from "axios";
import { API_BASEURL } from "../constants";

export const createReport = async (report) => {
  const { data } = await axios.post(`${API_BASEURL}/report`, report);
  return data;
};
