import { toast } from "react-toastify";
import { getCareers } from "../../services/careerServices";
import { getAll, getSlice, updateLoading } from "../slices/careerSlice";

export const fetchCareers = (skip, limit) => async (dispatch) => {
  try {
    const data = await getCareers(skip, limit);
    if (skip || limit) {
      dispatch(getSlice(data));
    } else {
      dispatch(getAll(data));
    }
    console.log(data);
  } catch (error) {
    toast.error(
      error.response?.data?.message || "No se pudieron cargar las carreras"
    );
  } finally {
    dispatch(updateLoading(false));
  }
};
