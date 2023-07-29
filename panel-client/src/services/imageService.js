import axios from "axios";
import { API_BASEURL } from "../constants";

export const uploadImage = async (fileTraido) => {
  const file = new FormData();
  file.append("file", fileTraido);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data", // Importante: Indicar que la solicitud contiene datos multipart/form-data
    },
  };
  const respuesta = await axios.post(`${API_BASEURL}/image`, file, config);
  console.log(`data ${respuesta}`);
  return respuesta.data;
};
