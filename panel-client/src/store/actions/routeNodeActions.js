import { toast } from "react-toastify";
import { getRouteNodes } from "../../services/routeNodeServices";
import { getAll, getSlice } from "../slices/routeNodeSlice";

export const fetchRouteNodes = (skip, limit) => async (dispatch) => {
  try {
    const data = await getRouteNodes(skip, limit);

    if (skip || limit) {
      dispatch(getSlice(data));
    } else {
      dispatch(getAll(data));
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "No se pudieron solicitar los puntos de interés"
    );
  }
};
