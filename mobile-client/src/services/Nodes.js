import axios from "axios";
import { API_BASEURL } from "../constants";
import * as Location from "expo-location";

export const getAllNodes = async () => {
  const { data } = await axios.get(`${API_BASEURL}/node/coordinates`);
  // console.log(data);
  return { nodes: data?.results };
};

export const coordinatesGPS = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    console.log("Permission to access location was denied");
    return {};
  }

  const location = await Location.getCurrentPositionAsync({});
  //pueden usar esto para pintar la ubicación como un pin
  const gpsPoint = {
    _id: "123456789",
    available: true,
    color: "yellow",
    coordinates: [
      location.coords.latitude.toString(),
      location.coords.longitude.toString(),
    ],
    latitude: location.coords.latitude.toString(),
    longitude: location.coords.longitude.toString(),
    name: "Mi Ubicación",
    type: "Mi Ubicación",
    isPreselected: true,
  };

  return gpsPoint;
};

export const findNearestRoute = async (node) => {
  try {
    const { data } = await axios.post(`${API_BASEURL}/route`, node);
    return data;
  } catch (error) {
    console.log(`eeerror ${error}`);
  }
};
