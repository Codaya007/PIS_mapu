import React, { useEffect, useState } from "react";
import { FeatureGroup, useMap, Polygon, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import 'leaflet-draw';
import { getRandomIntInRange } from "../utils";

const allowedColors = ["red", "purple", "blue", "yellow", "pink", "black"]

function MapWithDraw({ onPolygonDrawn, drawnPolygons = [] }) {
  const map = useMap();

  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
        edit: false,
        remove: false,
      },
    });

    map.addControl(drawControl);

    const handleDrawnPolygon = (e) => {
      const { layer } = e;
      const newPolygon = layer.toGeoJSON();

      const coordinates = newPolygon.geometry.coordinates[0];

      const mapedCoordinates = coordinates.map(c => [c[1], c[0]])

      onPolygonDrawn(mapedCoordinates);
    };

    map.on(L.Draw.Event.CREATED, handleDrawnPolygon);

    return () => {
      map.removeControl(drawControl);
      map.off(L.Draw.Event.CREATED, handleDrawnPolygon);
    };
  }, [map, onPolygonDrawn]);

  useEffect(() => {
    // Eliminar todos los polígonos existentes en el mapa
    map.eachLayer((layer) => {
      if (layer instanceof L.Polygon) {
        map.removeLayer(layer);
      }
    });

    if (drawnPolygons.length > 0) {
      let i = 1;
      for (const polygonCoordinates of drawnPolygons) {

        const color = allowedColors[getRandomIntInRange(0, allowedColors.length - 1)]
        const polygon = L.polygon(polygonCoordinates, { color }).addTo(map);

        // polygon.on("click", () => {
        //   console.log("evento");
        //   polygon.remove()
        // })

        polygon.bindTooltip(`Polígono ${i}`)
        i++;
        map.fitBounds(polygon.getBounds());
      }
    }
    // else{
    // 	var polygon = L.polygon().removeFrom(map);
    // 	map.fitBounds(polygon.getBounds());
    // }
  }, [drawnPolygons]);

  return (
    <FeatureGroup>
      {drawnPolygons.map((polygon, index) => {
        return <Polygon pathOptions={{ color: "purple" }} key={index} positions={polygon}>
          <Tooltip>Polígono {index + 1}</Tooltip>
        </Polygon>
      })}
    </FeatureGroup>
  );
};

export default MapWithDraw;
