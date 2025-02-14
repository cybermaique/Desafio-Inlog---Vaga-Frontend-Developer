import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import truckIcon from "../../utils/map/truck-icon";

interface TruckMapProps {
  position: { lat: number; lng: number } | null;
  setPosition: (position: { lat: number; lng: number }) => void;
  setValue: (field: string, value: number) => void;
}

const LocationMarker = ({ position, setPosition, setValue }: TruckMapProps) => {
  const map = useMap();

  useEffect(() => {
    if (position && map) {
      map.setView([position.lat, position.lng], map.getZoom());
    }
  }, [position, map]);

  useMapEvents({
    click(e) {
      setValue("latitude", e.latlng.lat);
      setValue("longitude", e.latlng.lng);
      setPosition(e.latlng);
    },
  });

  return position ? <Marker position={position} icon={truckIcon} /> : null;
};

const TruckSelectionMap = ({
  position,
  setPosition,
  setValue,
}: TruckMapProps) => {
  return (
    <MapContainer
      center={position || [-25.43247, -49.27845]}
      zoom={13}
      style={{ height: 300, width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker
        position={position}
        setPosition={setPosition}
        setValue={setValue}
      />
    </MapContainer>
  );
};

export default TruckSelectionMap;
