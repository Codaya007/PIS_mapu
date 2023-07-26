import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Función para manejar el caso de éxito
const onRequestSuccess = async (config) => {
  // Realizar alguna tarea asincrónica antes de enviar la solicitud, por ejemplo, una llamada a una API para obtener un token.
  const token = await AsyncStorage.getItem("token");

  config.headers.Authorization = `Bearer ${token}`;

  return config;
};

axios.interceptors.request.use(onRequestSuccess, (error) => {});
