const EARTH_RADIUS_M = 6371e3;

const LIMIT_ACCESS_POINTS_BY_CAMPUS = 7;

//! Latitud (latitud geográfica):
// Rango válido: -90° a +90°
// El ecuador se encuentra a 0° de latitud.
// El Polo Norte está a +90° de latitud.
// El Polo Sur está a -90° de latitud.
//! Longitud (longitud geográfica):
// Rango válido: -180° a +180°
// El meridiano de Greenwich se encuentra a 0° de longitud.
// Las longitudes al este de Greenwich están en el rango de 0° a +180°.
// Las longitudes al oeste de Greenwich están en el rango de 0° a -180°.
const MIN_LAT = -90;
const MAX_LAT = 90;
const MIN_LON = -180;
const MAX_LON = 180;

const NORMAL_ROLE_NAME = "Normal";

const ADMIN_ROLE_NAME = "Administrador";

const NODE = "NODE";

const SUBNODE = "SUBNODE";

const LOSTPOINT = "LOSTPOINT";

const VIA_NODO_TYPE = "VIA";
const ROUTE_NODO_TYPE = "ROUTE";
const INTEREST_NODO_TYPE = "INTEREST";
const ENTRANCE_NODO_TYPE = "ENTRANCE";
const ACCESS_NODO_TYPE = "ACCESS";

const CLASSROOM_CATEGORY = "CLASSROOM";
const BATHROOM_CATEGORY = "BATHROOM";

module.exports = {
  EARTH_RADIUS_M,
  NORMAL_ROLE_NAME,
  ADMIN_ROLE_NAME,
  NODE,
  SUBNODE,
  LOSTPOINT,
  BATHROOM_CATEGORY,
  CLASSROOM_CATEGORY,
  ACCESS_NODO_TYPE,
  ENTRANCE_NODO_TYPE,
  INTEREST_NODO_TYPE,
  ROUTE_NODO_TYPE,
  VIA_NODO_TYPE,
  LIMIT_ACCESS_POINTS_BY_CAMPUS,
  MIN_LAT,
  MAX_LAT,
  MIN_LON,
  MAX_LON,
};
