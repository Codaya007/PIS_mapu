import { Box, Checkbox, Text } from "@chakra-ui/react";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import {
  CircleMarker,
  MapContainer as Map,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import MapLine from "./MapLine";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const MapContainer = ({
  nodes,
  selectedNode,
  handleAddAdjacency = () => {},
  width = "100%",
  height = "80vh",
  adjacencies = [],
  allAdjacencies = [],
}) => {
  const [center, setCenter] = useState([-4.030716, -79.1994819]);
  const [zoom, setZoom] = useState(20);
  const [showAllAdjacencies, setShowAllAdjacencies] = useState(false);

  useEffect(() => {
    if (selectedNode) {
      setCenter(selectedNode?.coordinates);
      setZoom(25);
    }
  }, [selectedNode]);

  return (
    <Box margin={0} p={4} paddingBottom={10} width={width} height={height}>
      <Box
        maxWidth={"300px"}
        display={"flex"}
        p={3}
        justifyContent={"space-between"}
      >
        <Text>Mostrar todas las adyacencias</Text>
        <Checkbox
          onChange={(e) => setShowAllAdjacencies(e.target.checked)}
          value={showAllAdjacencies}
        ></Checkbox>
      </Box>
      <Map
        style={{ width: "100%", height: "100%" }}
        center={center}
        zoom={zoom}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* Renderizar los nodos */}
        {nodes.map((node) =>
          selectedNode?._id === node._id ? (
            // Este es el propio nodo seleccionado
            <Marker key={node._id} position={node.coordinates}>
              <Popup>{node.name}</Popup>
            </Marker>
          ) : (
            // El resto de nodos
            <CircleMarker
              center={node.coordinates}
              key={node._id}
              radius={5}
              pathOptions={{ color: node?.color || "red" }}
            >
              {/* Si hay un nodo seleccionado, se debe poder añadir como adyacencia este nodo, si aún no forma parte de sus adyacencias */}
              {selectedNode &&
              !adjacencies.map((ad) => ad.destination).includes(node._id) ? (
                <Popup>
                  <span
                    onClick={(e) => handleAddAdjacency(node)}
                    style={{ cursor: "pointer" }}
                  >
                    Añadir adyacencia hacia '{node.name}'
                  </span>
                </Popup>
              ) : (
                <Popup>{node.name}</Popup>
              )}
            </CircleMarker>
          )
        )}
        {selectedNode &&
          adjacencies?.map((adjacency, index) => (
            <MapLine
              key={index}
              start={selectedNode.coordinates}
              end={adjacency.destinationCoordinates}
            />
          ))}
        {showAllAdjacencies &&
          allAdjacencies?.map((adjacency, index) => (
            <MapLine
              color={"blue"}
              key={index}
              start={adjacency.startCoordinates}
              end={adjacency.destinationCoordinates}
            />
          ))}
      </Map>
    </Box>
  );
};

export default MapContainer;
