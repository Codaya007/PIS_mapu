import { toast } from "react-toastify";
import { getUsers } from "../../services/userServices";
import { getAll, getSlice } from "../slices/userSlice";

export const fetchUsers = (skip, limit) => async (dispatch) => {
  try {
    const data = await getUsers(skip, limit);

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
