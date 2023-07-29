import { Box } from "@chakra-ui/react";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

const icon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});

const defaultMarkers = [
  {
    _id: 1,
    coordinates: [-4.032747, -79.202405],
    name: "Universidad Nacional de Loja",
    color: "red",
  },
];

const center = [-4.032747, -79.202405];

function MapContainerComponent({
  markers = defaultMarkers,
  circle = false,
  zoom = 18,
  w = "90%",
  h = "60vh",
}) {
  return (
    <Box p={4}>
      <MapContainer
        style={{ width: w, height: h }}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        interactive={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) =>
          circle ? (
            <CircleMarker
              center={marker.coordinates}
              key={marker._id}
              radius={5}
              pathOptions={{ color: marker.color || "red" }}
            >
              <Popup>{marker.name}</Popup>
            </CircleMarker>
          ) : (
            <Marker key={marker._id} icon={icon} position={marker.coordinates}>
              <Popup>{marker.name}</Popup>
            </Marker>
          )
        )}
      </MapContainer>
    </Box>
  );
}

export default MapContainerComponent;
