import { toast } from "react-toastify";
import { getFaculties } from "../../services/facultyServices";
import { getAll, getSlice } from "../slices/facultySlice";

export const fetchFaculties = (skip, limit) => async (dispatch) => {
  try {
    const data = await getFaculties(skip, limit);

    if (skip || limit) {
      dispatch(getSlice(data));
    } else {
      dispatch(getAll(data));
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Algo salió mal");
  }
};
