import React, { useEffect, useState } from "react";
import { FeatureGroup, useMap, GeoJSON } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import 'leaflet-draw';

function MapWithDraw({ faculty, onPolygonDrawn}) {
  const map = useMap();
  const [drawnPolygons, setDrawnPolygons] = useState([]);

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
      setDrawnPolygons((prevPolygons) => [...prevPolygons, layer.toGeoJSON()]);
      onPolygonDrawn(layer.toGeoJSON());
    };

    map.on(L.Draw.Event.CREATED, handleDrawnPolygon);

    return () => {
      map.removeControl(drawControl);
      map.off(L.Draw.Event.CREATED, handleDrawnPolygon);
    };
  }, [map, onPolygonDrawn]);

  useEffect(() => {
    if (faculty.polygons.length > 0) {
      const coordinatesPolygon = () => {
        var latAux;
        var lngAux;
        var latlngs = [];

        for (let i = 0; i < faculty.polygons[0].length; i++) {
          latAux = faculty.polygons[0][i][1];
          lngAux = faculty.polygons[0][i][0];
          latlngs.push([latAux, lngAux]);
        }
        return latlngs;

      };

      const coordinates = coordinatesPolygon();
      var polygon = L.polygon(coordinates).addTo(map);
      map.fitBounds(polygon.getBounds());
    }
    // else{
    // 	var polygon = L.polygon().removeFrom(map);
    // 	map.fitBounds(polygon.getBounds());
    // }
  }, [faculty]);

  return (
      <FeatureGroup>
        {/* {initialCoordinates.length > 0 &&
        <GeoJSON
          key="initial-polygon"
          data={{ type: "Polygon", coordinates: initialCoordinates }}
        />
      } */}
        {drawnPolygons.map((polygon, index) => (
          <GeoJSON key={index} data={polygon} />
        ))}
      </FeatureGroup>
  );
};

export default MapWithDraw;
