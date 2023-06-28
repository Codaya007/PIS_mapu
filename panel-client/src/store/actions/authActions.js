import axios from "axios";
import { API_BASEURL } from "../../constants";
import { login } from "../slices/authSlice";

// Define a thunk that dispatches those action creators
export const loginUser = (email, password) => async (dispatch) => {
  const { data } = await axios.post(`${API_BASEURL}/auth/login`, {email, password});

  dispatch(login(data));
};

export const fetchProfile = () => async (dispatch) => {
  const { data } = await axios.get(`${API_BASEURL}/me`);

  dispatch(login(data));
};