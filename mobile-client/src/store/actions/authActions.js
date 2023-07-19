import axios from "axios";
import { API_BASEURL } from "../../constants";
import { login, logout, updateProfile } from "../slices/authSlice";
import { AsyncStorage } from "react-native";

// Define a thunk that dispatches those action creators
export const loginUser = (email, password) => async (dispatch) => {
  const { data } = await axios.post(`${API_BASEURL}/auth/login`, {
    email,
    password,
  });

  await AsyncStorage.setItem("user", JSON.stringify(data?.user));
  await AsyncStorage.setItem("token", JSON.stringify(data?.token));

  dispatch(login(data));
};

export const fetchProfile = () => async (dispatch) => {
  const { data } = await axios.get(`${API_BASEURL}/me`);

  await AsyncStorage.setItem("user", JSON.stringify(data));

  dispatch(updateProfile(data));
};

export const logoutAction = () => async (dispatch) => {
  await AsyncStorage.removeItem("user");
  await AsyncStorage.removeItem("token");

  dispatch(logout());
};
