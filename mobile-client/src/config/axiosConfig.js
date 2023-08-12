import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../store/store";
import { logoutAction } from "../store/actions/authActions";

// Función para manejar el caso de éxito
const onRequestSuccess = async (config) => {
  // Realizar alguna tarea asincrónica antes de enviar la solicitud, por ejemplo, una llamada a una API para obtener un token.
  const token = await AsyncStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
  }

  return config;
};

const onRejectRequest = (error) => {
  try {
    const responseData = error?.response?.data;

    // console.log({ responseData });

    // Verificar si el error es debido a un token JWT expirado
    if (responseData && responseData.code === "jwtExpired") {
      // Realizar la acción de deslogueo aquí (por ejemplo, redireccionar a la página de inicio de sesión)
      console.log("Token JWT expirado. Realizar deslogueo automático.");
      store.dispatch(logoutAction());
    }
  } catch (err) {
    console.log({ err });
  }

  return Promise.reject(error);
};

axios.interceptors.request.use(onRequestSuccess, (error) => {});
axios.interceptors.response.use((response) => response, onRejectRequest);
