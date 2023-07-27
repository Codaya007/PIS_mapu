import axios from "axios";
import { API_BASEURL } from "../../constants";
import { login, logout, updateProfile } from "../slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const uploadImage = async (fileTraido) => {
  const file = new FormData();
  file.append("image", fileTraido);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // Importante: Indicar que la solicitud contiene datos multipart/form-data
    },
  };
  const respuesta = await axios.post(`${API_BASEURL}/image`, file, config);
  console.log(`data ${respuesta}`);
};

export const loginUser = (email, password) => async (dispatch) => {
  const { data } = await axios.post(`${API_BASEURL}/auth/login`, {
    email,
    password,
  });

  await AsyncStorage.setItem("user", JSON.stringify(data?.user));
  await AsyncStorage.setItem("token", JSON.stringify("Bearer " + data?.token));
  console.log(data?.token);
  dispatch(login(data));
};

export const fetchProfile = () => async (dispatch) => {
  const { data } = await axios.get(`${API_BASEURL}/me`);

  await AsyncStorage.setItem("user", JSON.stringify(data));

  dispatch(updateProfile(data));
};

export const updateUser = (user) => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  const tokenSinComillas = token.replace(/^"(.*)"$/, "$1");

  const { data } = await axios.put(
    `${API_BASEURL}/me`,
    {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      avatar: user.avatar,
      notification: user.notification,
      spam: user.spam,
    },
    {
      headers: {
        Authorization: `${tokenSinComillas}`,
      },
    }
  );
  await AsyncStorage.setItem("user", JSON.stringify(data));
  dispatch(updateProfile(data));
};

export const updatePassword = (user) => async (dispatch) => {
  const { data } = await axios.get(`${API_BASEURL}/me`);

  await AsyncStorage.setItem("user", JSON.stringify(data));

  dispatch(updateProfile(data));
};

export const updateUserPassword = (password) => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  const tokenSinComillas = token.replace(/^"(.*)"$/, "$1");

  const { data } = await axios.put(
    `${API_BASEURL}/me`,
    {
      password,
    },
    {
      headers: {
        Authorization: `${tokenSinComillas}`,
      },
    }
  );
  await AsyncStorage.setItem("user", JSON.stringify(data));
  dispatch(updateProfile(data));
};

export const logoutAction = () => async (dispatch) => {
  await AsyncStorage.removeItem("user");
  await AsyncStorage.removeItem("token");

  dispatch(logout());
};
