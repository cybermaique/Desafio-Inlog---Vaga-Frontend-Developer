export interface Truck {
  id: string;
  identifier: string;
  license_plate: string;
  tracker_serial_number: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface TruckWithDistance extends Truck {
  distance: number;
}

export type NewTruck = Omit<Truck, "id">;
