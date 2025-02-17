import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { TruckApiResponse } from "../../interfaces/truck";
import truckIcon from "../../utils/map/truck-icon";

interface MapProps {
  readonly trucks: readonly TruckApiResponse[];
  readonly selectedTruck: TruckApiResponse | null;
}

const FlyToTruck = ({
  selectedTruck,
}: {
  selectedTruck: TruckApiResponse | null;
}) => {
  const map = useMap();
  if (selectedTruck) {
    map.flyTo(
      [selectedTruck.coordinates.latitude, selectedTruck.coordinates.longitude],
      10,
      { animate: true }
    );
  }
  return null;
};

export const TruckViewMap = ({ trucks, selectedTruck }: MapProps) => {
  return (
    <MapContainer
      center={[-23.55052, -46.63331]}
      zoom={5}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <FlyToTruck selectedTruck={selectedTruck} />

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
            <br />
            Início: {truck.start_date}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
