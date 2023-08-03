import { toast } from "react-toastify";
import { getComments } from "../../services/commentServices";
import { getAll, getSlice, updateLoading } from "../slices/commentSlice";

export const fetchComments =
  (skip, limit, populate = true) =>
  async (dispatch) => {
    try {
      const data = await getComments(skip, limit, populate);

      if (skip || limit) {
        dispatch(getSlice(data));
      } else {
        dispatch(getAll(data));
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "No se pudieron cargar los comentarios"
      );
    } finally {
      dispatch(updateLoading(false));
    }
  };
