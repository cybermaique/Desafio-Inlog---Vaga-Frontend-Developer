import truckIconLocation from "../assets/icons/location-truck.svg";

import L from "leaflet";

const truckIcon = new L.Icon({
  iconUrl: truckIconLocation,
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export default truckIcon;
