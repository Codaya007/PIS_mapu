import { toast } from "react-toastify";
import { getEvents } from "../../services/eventServices";
import { getAll, getSlice } from "../slices/eventSlice";

export const fetchEvents = (skip, limit) => async (dispatch) => {
  try {
    const data = await getEvents(skip, limit);

    console.log("En action: ", data);
    if (skip || limit) {
      dispatch(getSlice(data));
    } else {
      dispatch(getAll(data));
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Algo salio mal 2");
  }
};
