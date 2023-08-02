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

export const getAllNodeTypes = async (skip, limit) => {
  const { data } = await axios.get(`${API_BASEURL}/type`);

  return data;
};

export const updateNodeAdjacencies = async (_id, adjacencies, toDelete) => {
  await axios.post(`${API_BASEURL}/adjacency`, {
    nodes: [
      {
        _id,
        adjacencies,
        toDelete,
      },
    ],
  });
};
