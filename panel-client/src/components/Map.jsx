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
  const universityCoordinates = [-3.99313, -79.20259];

  return (
    <div style={{ display: "block" }}>
      <MapContainer
        center={universityCoordinates}
        zoom={18}
        scrollWheelZoom={false}
        style={{ height: 400, width: "100%", zIndex: 94 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <Marker icon={icon} position={universityCoordinates}>
          <Popup>Universidad Nacional de Loja</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapContainerComponent;
