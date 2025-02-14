import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { TRUCK_TABLE_COLUMNS } from "../../constants/table";
import { TruckWithDistance } from "../../interfaces/truck";
import { TruckTable } from "./table";

const mockTrucks: TruckWithDistance[] = [
  {
    id: "1",
    identifier: "A1",
    license_plate: "ABC123",
    tracker_serial_number: "TSN001",
    coordinates: { latitude: 10, longitude: 20 },
    distance: 100,
    image: "",
  },
  {
    id: "2",
    identifier: "B2",
    license_plate: "DEF456",
    tracker_serial_number: "TSN002",
    coordinates: { latitude: 30, longitude: 40 },
    distance: 200,
    image: "",
  },
  {
    id: "3",
    identifier: "C3",
    license_plate: "GHI789",
    tracker_serial_number: "TSN003",
    coordinates: { latitude: 50, longitude: 60 },
    distance: 300,
    image: "",
  },
  {
    id: "4",
    identifier: "D4",
    license_plate: "JKL012",
    tracker_serial_number: "TSN004",
    coordinates: { latitude: 70, longitude: 80 },
    distance: 400,
    image: "",
  },
  {
    id: "5",
    identifier: "E5",
    license_plate: "MNO345",
    tracker_serial_number: "TSN005",
    coordinates: { latitude: 90, longitude: 100 },
    distance: 500,
    image: "",
  },
];

describe("TruckTable", () => {
  let setSelectedTruck: Mock;
  let setIsDistanceDescending: Mock;

  beforeEach(() => {
    setSelectedTruck = vi.fn();
    setIsDistanceDescending = vi.fn();
  });

  it("should render the table correctly", () => {
    render(
      <TruckTable
        trucks={mockTrucks}
        selectedTruck={null}
        setSelectedTruck={setSelectedTruck}
        setIsDistanceDescending={setIsDistanceDescending}
        isDistanceDescending={false}
      />
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("should render the columns correctly", () => {
    render(
      <TruckTable
        trucks={mockTrucks}
        selectedTruck={null}
        setSelectedTruck={setSelectedTruck}
        setIsDistanceDescending={setIsDistanceDescending}
        isDistanceDescending={false}
      />
    );

    TRUCK_TABLE_COLUMNS.forEach((column) => {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    });
  });

  it("should change sorting when clicking on a sortable column", () => {
    render(
      <TruckTable
        trucks={mockTrucks}
        selectedTruck={null}
        setSelectedTruck={setSelectedTruck}
        setIsDistanceDescending={setIsDistanceDescending}
        isDistanceDescending={false}
      />
    );

    const sortableColumn = screen.getByText(
      TRUCK_TABLE_COLUMNS.find((col) => col.sortable)?.label || ""
    );
    fireEvent.click(sortableColumn);

    expect(setIsDistanceDescending).toHaveBeenCalledWith(true);
  });

  it("should display the correct number of results", () => {
    render(
      <TruckTable
        trucks={mockTrucks}
        selectedTruck={null}
        setSelectedTruck={setSelectedTruck}
        setIsDistanceDescending={setIsDistanceDescending}
        isDistanceDescending={false}
      />
    );

    expect(
      screen.getByText(`${mockTrucks.length} Resultados encontrados`)
    ).toBeInTheDocument();
  });

  it("should paginate correctly when changing pages", () => {
    render(
      <TruckTable
        trucks={mockTrucks}
        selectedTruck={null}
        setSelectedTruck={setSelectedTruck}
        setIsDistanceDescending={setIsDistanceDescending}
        isDistanceDescending={false}
      />
    );
    const nextPageButton = screen.getByRole("button", { name: /next page/i });
    fireEvent.click(nextPageButton);
    expect(screen.getByText("B2")).toBeInTheDocument();
  });
});
