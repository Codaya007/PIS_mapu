import { toast } from "react-toastify";
import { getUsers } from "../../services/userServices";
import { getAll, getSlice, updateLoading } from "../slices/userSlice";

export const fetchUsers = (skip, limit) => async (dispatch) => {
  try {
    const data = await getUsers(skip, limit);

    if (skip || limit) {
      dispatch(getSlice(data));
    } else {
      dispatch(getAll(data));
    }
  } catch (error) {
    console.log(error);
    toast.error(
      error.response?.data?.message || "No se pudieron cargar los usuarios"
    );
  } finally {
    dispatch(updateLoading(false));
  }
};
