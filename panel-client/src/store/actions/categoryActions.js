import { toast } from "react-toastify";
import { getCategories } from "../../services/categoryServices";
import { getAll, getSlice } from "../slices/categorySlice";

export const fetchCategories = (skip, limit) => async (dispatch) => {
  try {
    console.log("fechCategory");
    const data = await getCategories(skip, limit);
    if (skip || limit) {
      dispatch(getSlice(data));
    } else {
      dispatch(getAll(data));
    }
    console.log(data);
  } catch (error) {
    toast.error(error.response?.data?.message || "Algo salio mal");
  }
};
