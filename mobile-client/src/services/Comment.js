import axios from "axios";
import { API_BASEURL } from "../constants";

export const getAllCommentsFromNode = async (node, populate = true) => {
  const { data } = await axios.get(
    `${API_BASEURL}/comment/?mobile=true&node=${node}&populate=${populate}`
  );

  return data;
};
