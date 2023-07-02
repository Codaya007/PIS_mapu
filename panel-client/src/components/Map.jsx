import { Box } from "@chakra-ui/react";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const icon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});

function MapContainerComponent() {
  const position = [-4.035475, -79.200633];

  //   .leaflet-container {
  //   width: 90%;
  //   height: 80vh;
  // }

  return (
    <Box p={4}>
      <MapContainer
        style={{ width: "90%", height: "60vh" }}
        center={position}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={icon} position={position}>
          <Popup>Universidad Nacional De Loja</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
}

export default MapContainerComponent;
