import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import "leaflet/dist/leaflet.css";
import { describe, expect, it, vi } from "vitest";
import { TruckNormalized } from "../../interfaces/truck-normalized";
import { TruckViewMap } from "./truck-view-map";

vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map">{children}</div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ position }: { position: [number, number] }) => (
    <div data-testid="marker" data-lat={position[0]} data-lng={position[1]} />
  ),
  Popup: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popup">{children}</div>
  ),
  useMap: () => ({ flyTo: vi.fn() }),
}));

const mockTrucks: TruckNormalized[] = [
  {
    id: "1",
    identifier: "Truck A",
    license_plate: "ABC-1234",
    tracker_serial_number: "123456",
    coordinates: { latitude: -23.55, longitude: -46.63 },
    image: "",
    start_date: "2023-01-01T00:00:00Z",
  },
];

describe("TruckViewMap", () => {
  it("should render the map with necessary components", () => {
    render(<TruckViewMap trucks={mockTrucks} selectedTruck={null} />);

    expect(screen.getByTestId("map")).toBeInTheDocument();
    expect(screen.getByTestId("tile-layer")).toBeInTheDocument();
    expect(screen.getByTestId("marker")).toBeInTheDocument();
  });

  it("should update the position when a truck is selected", () => {
    render(<TruckViewMap trucks={mockTrucks} selectedTruck={mockTrucks[0]} />);
    expect(screen.getByTestId("marker")).toHaveAttribute("data-lat", "-23.55");
    expect(screen.getByTestId("marker")).toHaveAttribute("data-lng", "-46.63");
  });
});
