import axios from "axios";
import { API_BASEURL } from "../constants";

export const getInterestingNodesByStringSearch = async (search) => {
    const { data } = await axios.get(`${API_BASEURL}/interesting-node?search=${search}`);

    console.log(data);

    return { nodes: data?.results };
};
