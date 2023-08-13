import axios from "axios";
import { API_BASEURL } from "../constants";

export const getUserById = async (id) => {
  const { data } = await axios.get(`${API_BASEURL}/user/${id}`);
  console.log("user ID DAtaatAAA",data);
  return { data: data?.results };
};
