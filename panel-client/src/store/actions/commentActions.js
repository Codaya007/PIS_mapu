import { toast } from "react-toastify";
import { getComments } from "../../services/commentServices";
import { getAll, getSlice } from "../slices/commentSlice";

export const fetchComments =
  (skip, limit, populate = true) =>
  async (dispatch) => {
    try {
      const data = await getComments(skip, limit, populate);

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
