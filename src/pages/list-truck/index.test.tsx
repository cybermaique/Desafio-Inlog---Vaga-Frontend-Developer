import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import ListTruck from ".";
import { Truck, TruckWithDistance } from "../../interfaces/truck";
import { useGetTrucks } from "../../services/get-trucks";
import { useLoadingStore } from "../../stores/loading";
import { useSnackbarStore } from "../../stores/snackbar";
import { getDistance, sortAndFilterTrucks } from "../../utils/list-truck";

vi.mock("../../services/get-trucks");
vi.mock("../../stores/loading");
vi.mock("../../stores/snackbar");
vi.mock("../../utils/truck");

vi.mock("../../utils/list-truck", () => ({
  getDistance: vi.fn(),
  sortAndFilterTrucks: vi.fn(),
  formatLicensePlate: vi.fn(),
}));

describe("ListTruck Component", () => {
  const mockTrucks: Truck[] = [
    {
      id: "1",
      identifier: "1",
      license_plate: "ABC123",
      tracker_serial_number: "123456",
      coordinates: { latitude: -23.55052, longitude: -46.633308 },
      image: "",
    },
    {
      id: "2",
      identifier: "2",
      license_plate: "XYZ789",
      tracker_serial_number: "654321",
      coordinates: { latitude: -23.551, longitude: -46.634 },
      image: "",
    },
    {
      id: "3",
      identifier: "3",
      license_plate: "DEF456",
      tracker_serial_number: "987654",
      coordinates: { latitude: -23.552, longitude: -46.635 },
      image: "",
    },
  ];

  const mockUserLocation = {
    latitude: -23.55052,
    longitude: -46.633308,
  };

  beforeEach(() => {
    (useGetTrucks as Mock).mockReturnValue({
      data: mockTrucks,
      error: null,
      isLoading: false,
    });
    (useLoadingStore as unknown as Mock).mockReturnValue({
      setLoading: vi.fn(),
    });
    (useSnackbarStore as unknown as Mock).mockReturnValue({
      showSnackbar: vi.fn(),
    });

    (getDistance as Mock).mockImplementation((lat1, lon1, lat2, lon2) => {
      return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
    });

    (sortAndFilterTrucks as Mock).mockImplementation(
      (trucks, filters, isDistanceDescending, userLocation) => {
        const sortedTrucks = trucks.map((truck: TruckWithDistance) => ({
          ...truck,
          distance: getDistance(
            userLocation.latitude,
            userLocation.longitude,
            truck.coordinates.latitude,
            truck.coordinates.longitude
          ),
        }));

        sortedTrucks.sort((a: { distance: number }, b: { distance: number }) =>
          isDistanceDescending
            ? b.distance - a.distance
            : a.distance - b.distance
        );

        return sortedTrucks.filter(
          (truck: TruckWithDistance) =>
            (!filters.licensePlate ||
              truck.license_plate
                .toLowerCase()
                .includes(filters.licensePlate.toLowerCase())) &&
            (!filters.trackerSerialNumber ||
              truck.tracker_serial_number
                .toLowerCase()
                .includes(filters.trackerSerialNumber.toLowerCase())) &&
            (!filters.maxDistance ||
              truck.distance <= parseFloat(filters.maxDistance))
        );
      }
    );
  });

  it("should render the ListTruck component", () => {
    render(<ListTruck />);
    expect(screen.getByText("Listagem de Caminhões")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Confira a localização e detalhes dos caminhões disponíveis."
      )
    ).toBeInTheDocument();
  });

  it("should call handleSearch when 'Enter' is pressed", () => {
    render(<ListTruck />);

    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);

    fireEvent.change(inputs[0], { target: { value: "ABC123" } });
    fireEvent.keyDown(inputs[0], { key: "Enter", code: "Enter", charCode: 13 });
  });

  it("should clear filters when handleClear is called", () => {
    render(<ListTruck />);

    const licensePlateInput = screen.getAllByRole("textbox")[0];
    const trackerSerialNumberInput = screen.getAllByRole("textbox")[1];
    const maxDistanceInput = screen.getByRole("spinbutton");

    fireEvent.change(licensePlateInput, { target: { value: "ABC123" } });
    fireEvent.change(trackerSerialNumberInput, { target: { value: "123456" } });
    fireEvent.change(maxDistanceInput, { target: { value: "100" } });

    const clearButton = screen.getByRole("button", { name: /limpar/i });
    fireEvent.click(clearButton);

    expect(licensePlateInput).toHaveValue("");
    expect(trackerSerialNumberInput).toHaveValue("");
    expect(maxDistanceInput).toHaveValue(null);
  });

  it("should sort trucks by distance in ascending order", () => {
    render(<ListTruck />);

    const sortedTrucks = sortAndFilterTrucks(
      mockTrucks,
      { licensePlate: "", trackerSerialNumber: "", maxDistance: "" },
      false,
      mockUserLocation
    );

    expect(sortedTrucks[0].license_plate).toBe("ABC123");
    expect(sortedTrucks[1].license_plate).toBe("XYZ789");
    expect(sortedTrucks[2].license_plate).toBe("DEF456");
  });

  it("should sort trucks by distance in descending order", () => {
    render(<ListTruck />);

    const sortedTrucks = sortAndFilterTrucks(
      mockTrucks,
      { licensePlate: "", trackerSerialNumber: "", maxDistance: "" },
      true,
      mockUserLocation
    );

    expect(sortedTrucks[0].license_plate).toBe("DEF456");
    expect(sortedTrucks[1].license_plate).toBe("XYZ789");
    expect(sortedTrucks[2].license_plate).toBe("ABC123");
  });
});
