import React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const MapLine = ({ start, end }) => {
  const map = useMap();

  React.useEffect(() => {
    const line = L.polyline([start, end], { color: "red" }).addTo(map);
    return () => {
      map.removeLayer(line);
    };
  }, [start, end, map]);

  return null;
};

export default MapLine;
