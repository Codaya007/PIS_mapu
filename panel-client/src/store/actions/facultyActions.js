import axios from "axios";
import { API_BASEURL } from "../../constants";
import { getSlice } from "../slices/facultySlice";

export const fetchFaculties = (skip, limit) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_BASEURL}/faculty?skip=${skip}&limit=${limit}`
    );
    dispatch(getSlice(response.data));
  } catch (error) {
    alert(error.message || "Algo salió mal");
  }
};
