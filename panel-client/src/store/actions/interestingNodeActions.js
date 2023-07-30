import { toast } from "react-toastify";
import { getInterestingNodes } from "../../services/interestingNodeServices";
import { getAll, getSlice } from "../slices/interestingNodeSlice";

export const fetchInterestingNodes = (skip, limit) => async (dispatch) => {
  try {
    const data = await getInterestingNodes(skip, limit);

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
