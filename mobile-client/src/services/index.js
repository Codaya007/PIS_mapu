import axios from "axios";
import { API_BASEURL } from "../constants";

export const getAllEvents = async () => {
  const { data } = await axios.get(`${API_BASEURL}/event?mobile=true`);

  // console.log(data.totalCount);

  return { events: data?.results };
};
