import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { TruckApiResponse, TruckWithDistance } from "../interfaces/truck";
import { formatDate } from "./date";

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
  let formatted = value.toUpperCase().replace(/[^A-Z\d]/g, "");

  if (formatted.length > 7) {
    formatted = formatted.slice(0, 7);
  }

  if (/^[A-Z]{3}\d{4}$/.test(formatted)) {
    return formatted.slice(0, 3) + "-" + formatted.slice(3);
  }

  if (/^[A-Z]{3}\d[A-Z]\d{2}$/.test(formatted)) {
    return formatted;
  }

  return formatted;
};

export const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const sortAndFilterTrucks = (
  trucks: TruckApiResponse[],
  appliedFilters: any,
  isDistanceDescending: boolean,
  userLocation: { latitude: number; longitude: number }
): TruckWithDistance[] => {
  const sortedTrucks: TruckWithDistance[] = (trucks ?? []).map((truck) => {
    const distance = userLocation
      ? getDistance(
          userLocation.latitude,
          userLocation.longitude,
          truck.coordinates.latitude,
          truck.coordinates.longitude
        )
      : 0;
    return { ...truck, distance };
  });

  sortedTrucks.sort((a, b) =>
    isDistanceDescending ? b.distance - a.distance : a.distance - b.distance
  );

  const maxDistance = appliedFilters.maxDistance
    ? parseFloat(appliedFilters.maxDistance)
    : Infinity;

  return sortedTrucks.filter(
    (truck) =>
      (!appliedFilters.licensePlate ||
        truck.license_plate
          .toLowerCase()
          .includes(appliedFilters.licensePlate.toLowerCase())) &&
      (!appliedFilters.trackerSerialNumber ||
        truck.tracker_serial_number
          .toLowerCase()
          .includes(appliedFilters.trackerSerialNumber.toLowerCase())) &&
      truck.distance <= maxDistance
  );
};

export const downloadTruckReport = (filteredTrucks: TruckWithDistance[]) => {
  const doc = new jsPDF();

  const columns = [
    "Identificador",
    "Placa",
    "Rastreador",
    "Distância (km)",
    "Data de início",
  ];
  const rows = filteredTrucks.map((truck) => [
    truck.identifier,
    truck.license_plate,
    truck.tracker_serial_number,
    truck.distance.toFixed(2),
    formatDate(truck.start_date),
  ]);

  autoTable(doc, {
    head: [columns],
    body: rows,
  });
  doc.save("relatorio-caminhoes.pdf");
};
