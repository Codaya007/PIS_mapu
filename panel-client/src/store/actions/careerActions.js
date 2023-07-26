import { toast } from "react-toastify";
import { getCareers } from "../../services/careerServices";
import { getAll, getSlice } from "../slices/careerSlice";

export const fetchCareers = (skip, limit) => async (dispatch) => {
  try {
    console.log("fechCareer");
    const data = await getCareers(skip, limit);
    if (skip || limit) {
      dispatch(getSlice(data));
    } else {
      dispatch(getAll(data));
    }
    console.log(data);
  } catch (error) {
    toast.error(error.response?.data?.message || "Algo salio mal");
  }
};
