import L from "leaflet";
import React from "react";
import { useMap } from "react-leaflet";

const MapLine = ({ start, end, color }) => {
  const map = useMap();

  React.useEffect(() => {
    const line = L.polyline([start, end], { color: color || "red" }).addTo(map);
    return () => {
      map.removeLayer(line);
    };
  }, [start, end, map]);

  return null;
};

export default MapLine;
