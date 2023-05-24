import axios from "axios";
import { getAll, setLoading } from "../slices/campusSlice";

// Define a thunk that dispatches those action creators
export const fetchCampus = () => async (dispatch) => {
  dispatch(setLoading(true));
  const { data } = await axios.get("https://dummyjson.com/products");

  dispatch(getAll(data?.products));
  dispatch(setLoading(false));
};
