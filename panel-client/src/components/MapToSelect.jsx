import { Box } from "@chakra-ui/react";
import React, { useMemo, useRef, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

function DraggableMarker({
  initialPosition,
  name = "Posición seleccionada",
  handleChangePointer = () => {},
}) {
  const [position, setPosition] = useState(initialPosition);
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;

        if (marker != null) {
          handleChangePointer(marker.getLatLng());
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>{name}</Popup>
    </Marker>
  );
}

const MapSelector = ({
  handleChangePointer = () => {},
  name = "Punto seleccionado",
  width = "100%",
  height = "60vh",
  zoom = 20,
  center = [-4.032741325743228, -79.20238582262152],
  nodes = [],
}) => {
  return (
    <Box p={4} width={width} height={height}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <DraggableMarker
          initialPosition={center}
          name={name}
          handleChangePointer={handleChangePointer}
        />
        {nodes.map((node) => (
          // El resto de nodos
          <CircleMarker
            center={node.coordinates}
            key={node._id}
            radius={5}
            pathOptions={{ color: node?.color || "pink" }}
          >
            <Popup>{node.name}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default MapSelector;
