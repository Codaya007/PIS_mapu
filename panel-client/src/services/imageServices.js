import axios from "axios";
import { API_BASEURL } from "../constants";

export const updateImageToS3 = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${API_BASEURL}/image`, formData);

    const imageUrl =  response.data.imageUrl;
		
		return imageUrl;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw error;
  }
};