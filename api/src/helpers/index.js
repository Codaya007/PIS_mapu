const { EARTH_RADIUS_M } = require("../constants");
const ValidationError = require("../errors/ValidationError");
const { Types } = require("mongoose");

/**
 * Calcula la distancia en metros entre dos coordenadas [latitud, longitud] usando la fórmula de Haversine
 * @param {[number, number]} coordinateA Coordenada de origen
 * @param {[number, number]} coordinateB Coordenada de destino
 * @return {number} Distancia en metros
 */
const getDistanceBetweenCoordinates = (coordinateA, coordinateB) => {
  if (!Array.isArray(coordinateA) || !Array.isArray(coordinateB))
    throw new ValidationError(
      "Las coordenadas A y B debe ser un array de latitud y longitud"
    );

  const [latA, lonA] = coordinateA;
  const [latB, lonB] = coordinateB;

  const R = EARTH_RADIUS_M; // Radio de la Tierra en km
  const dLat = degToRad(latB - latA); // Diferencia de latitud en radianes
  const dLon = degToRad(lonB - lonA); // Diferencia de longitud en radianes
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(latA)) *
      Math.cos(degToRad(latB)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distancia en km

  return d;
};

/**
 * Convierte de grados a radianes
 * @param {number} deg Grados decimales
 * @return {number} Equivalencia en radianes
 */
const degToRad = (deg) => {
  return deg * (Math.PI / 180);
};

/**
 * Valida un polígono geográfico de coordenadas
 * @param {Array} polygon Polígono geográfico de coordenadas
 * @return {Boolean} Es valido
 */
const isValidPolygon = (polygon) => {
  if (!Array.isArray(polygon)) return false;

  for (const coordinate of polygon) {
    if (!Array.isArray(coordinate)) return false;
    const [lat, lon] = coordinate;

    if (typeof lat !== "number" || typeof lon !== "number") return false;
  }

  return true;
};

const isValidObjectId = Types.ObjectId.isValid;

module.exports = {
  getDistanceBetweenCoordinates,
  degToRad,
  isValidPolygon,
  isValidObjectId,
};
