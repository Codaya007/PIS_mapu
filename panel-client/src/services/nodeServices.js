import axios from "axios";
import { API_BASEURL } from "../constants";
import { buildURLWithQueryParams } from "../utils";

export const getAllCoordinates = async (params = {}, skip, limit) => {
  const url = buildURLWithQueryParams(
    `${API_BASEURL}/node/coordinates`,
    params
  );

  const { data } = await axios.get(url);

  return data;
};
