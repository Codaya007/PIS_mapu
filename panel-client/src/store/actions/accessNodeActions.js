import { toast } from "react-toastify";
import { getAccessNodes } from "../../services/accessNodeServices";
import { getAll, getSlice, updateLoading } from "../slices/accessNodeSlice";

export const fetchAccessNodes = (skip, limit) => async (dispatch) => {
  try {
    const data = await getAccessNodes(skip, limit);

    if (skip || limit) {
      dispatch(getSlice(data));
    } else {
      dispatch(getAll(data));
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "No se pudieron cargar los puntos de interés"
    );
  } finally {
    dispatch(updateLoading(false));
  }
};
