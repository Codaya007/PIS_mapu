import { toast } from "react-toastify";
import { getBlocks } from "../../services/blockServices";
import { getAll, getSlice } from "../slices/blockSlice";

export const fetchBlocks = (skip, limit) => async (dispatch) => {
  try {
    const data = await getBlocks(skip, limit);

    if (skip || limit) {
      dispatch(getSlice(data));
    } else {
      dispatch(getAll(data));
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Algo salió mal");
  }
};
