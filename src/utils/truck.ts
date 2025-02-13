import { TruckWithDistance } from "../interfaces/truck";

export const getTruckCellValue = (
  truck: TruckWithDistance,
  key: string
): string => {
  if (key === "distance") return truck.distance.toFixed(2);
  if (key === "coordinates.latitude")
    return truck.coordinates.latitude.toString();
  if (key === "coordinates.longitude")
    return truck.coordinates.longitude.toString();
  return (truck as any)[key];
};

export const formatLicensePlate = (value: string): string => {
  let formatted = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

  if (formatted.length > 7) {
    formatted = formatted.slice(0, 7);
  }

  if (/^[A-Z]{3}[0-9]{4}$/.test(formatted)) {
    return formatted.slice(0, 3) + "-" + formatted.slice(3);
  }

  if (/^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/.test(formatted)) {
    return formatted;
  }

  return formatted;
};
