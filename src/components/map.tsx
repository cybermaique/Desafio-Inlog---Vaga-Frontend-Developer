import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Truck } from "../interfaces/truck";

interface MapProps {
  trucks: Truck[];
}

const truckIcon = new L.Icon({
  iconUrl: "/location-truck.svg",
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export function Map({ trucks }: MapProps) {
  return (
    <MapContainer
      center={[-23.55052, -46.63331]}
      zoom={5}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {trucks.map((truck) => (
        <Marker
          key={truck.id}
          position={[truck.coordinates.latitude, truck.coordinates.longitude]}
          icon={truckIcon}
        >
          <Popup>
            <strong>{truck.identifier}</strong>
            <br />
            Placa: {truck.license_plate}
            <br />
            Rastreador: {truck.tracker_serial_number}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
