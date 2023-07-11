import { toast } from "react-toastify";
import { getCampuses } from "../../services/campusServices";
import { getAll, getSlice } from "../slices/campusSlice";

export const fetchCampuses = (skip, limit) => async (dispatch) => {
  try {
    console.log("fechCampus");
    const data = await getCampuses(skip, limit);
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
