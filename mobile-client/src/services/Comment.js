import axios from "axios";
import { API_BASEURL } from "../constants";
import * as Location from "expo-location";

export const getAllCommentsFromNode = async (node) => {
  const { data } = await axios.get(`${API_BASEURL}/comment/?mobile=true&node=${node}`);
//   console.log("kalks xdd",data);
  return { data: data?.results };
};