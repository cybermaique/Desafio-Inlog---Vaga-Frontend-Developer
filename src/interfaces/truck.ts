export interface TruckApiResponse {
  id: string;
  identifier: string;
  license_plate: string;
  tracker_serial_number: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  image: string;
  start_date: string;
}

export interface TruckWithDistance extends TruckApiResponse {
  distance: number;
}

export type NewTruck = Omit<TruckApiResponse, "id">;
