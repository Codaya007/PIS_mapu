const { EARTH_RADIUS_M } = require("../constants");
const ValidationError = require("../errors/ValidationError");
const { Types } = require("mongoose");
const crypto = require("crypto");

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

/**
 * Valida si un string es un objectId válido
 * @param {String} string Id
 * @return {Boolean} Es valido
 */
const isValidObjectId = Types.ObjectId.isValid;

/**
 * Genera un string urlFriendly, que puede servir como token
 * @return {String} Devuelve token
 */
const generateUrlFriendlyToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

/**
 * Genera una fecha del inicio de un mes y año pasado como parámetro
 * @param {Number} month Mes del año
 * @param {Number} year Año
 * @return {Date} Fecha del inicio del año
 */
const getStartOfMonth = (month, year) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11

  const targetYear = year || currentYear;
  const targetMonth = month || currentMonth;

  const startDate = new Date(targetYear, targetMonth - 1, 1, 0, 0, 0); // Inicio del primer día del mes
  startDate.setHours(startDate.getHours() - 5); // Ajuste al horario de Ecuador (UTC-5)

  return startDate;
};

/**
 * Valida un polígono geográfico de coordenadas
 * @param {Array} polygon Polígono geográfico de coordenadas
 * @return {Boolean} Es valido
 */
const getEndOfMonth = (month, year) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11

  const targetYear = year || currentYear;
  const targetMonth = month || currentMonth;

  const endDate = new Date(targetYear, targetMonth, 0, 23, 59, 59); // Fin del último día del mes
  endDate.setHours(endDate.getHours() - 5); // Ajuste al horario de Ecuador (UTC-5)

  return endDate;
};

const timeBetweenCoordinates = (origin, destination, speed) => {
  const distance = getDistanceBetweenCoordinates(origin, destination);

  const time = distance / speed;

  return time;
}

module.exports = {
  getDistanceBetweenCoordinates,
  degToRad,
  isValidPolygon,
  isValidObjectId,
  generateUrlFriendlyToken,
  getStartOfMonth,
  getEndOfMonth,
  timeBetweenCoordinates
};
