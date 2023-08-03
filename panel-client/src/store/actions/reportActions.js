import { toast } from "react-toastify";
import { getReports } from "../../services/reportServices";
import { getAll, getSlice, updateLoading } from "../slices/reportSlice";

export const fetchReports = (skip, limit) => async (dispatch) => {
  try {
    const data = await getReports(skip, limit);

    if (skip || limit) {
      dispatch(getSlice(data));
    } else {
      dispatch(getAll(data));
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "No se pudieron cargar los reportes"
    );
  } finally {
    dispatch(updateLoading(false));
  }
};
