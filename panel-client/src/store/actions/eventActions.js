import { toast } from "react-toastify";
import { getEvents } from "../../services/eventServices";
import { getAll, getSlice, updateLoading } from "../slices/eventSlice";

export const fetchEvents = (skip, limit) => async (dispatch) => {
  try {
    const data = await getEvents(skip, limit);

    if (skip || limit) {
      dispatch(getSlice(data));
    } else {
      dispatch(getAll(data));
    }
  } catch (error) {
    console.log(error);
    toast.error(
      error.response?.data?.message || "No se pudieron cargar los eventos"
    );
  } finally {
    dispatch(updateLoading(false));
  }
};
