import axios from "axios";
import { logout } from "../store/slices/authSlice";
import { store } from "../store/store";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }

    return config;
  },
  (error) => {}
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      const responseData = error?.response?.data;

      // console.log({ responseData });

      // Verificar si el error es debido a un token JWT expirado
      if (responseData && responseData.code === "jwtExpired") {
        // Realizar la acción de deslogueo aquí (por ejemplo, redireccionar a la página de inicio de sesión)
        console.log("Token JWT expirado. Realizar deslogueo automático.");
        store.dispatch(logout());
      }
    } catch (err) {
      console.log({ err });
    }

    return Promise.reject(error);
  }
);
