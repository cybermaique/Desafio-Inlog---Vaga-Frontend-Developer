import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import useUserLocation from "../hooks/use-user-location";
import { useGetTrucks } from "../services/get-trucks";
import { sortAndFilterTrucks } from "../utils/list-truck";
import { useListTruck } from "./use-list-truck";

vi.mock("../services/get-trucks", () => ({
  useGetTrucks: vi.fn(),
}));

const setLoading = vi.fn();
vi.mock("../stores/loading", () => ({
  useLoadingStore: () => ({ setLoading }),
}));

const showSnackbar = vi.fn();
vi.mock("../stores/snackbar", () => ({
  useSnackbarStore: () => ({ showSnackbar }),
}));

vi.mock("../hooks/use-user-location", () => ({
  default: vi.fn(),
}));

vi.mock("../utils/list-truck", () => ({
  sortAndFilterTrucks: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();

  (useUserLocation as unknown as Mock).mockReturnValue({
    latitude: -23.55,
    longitude: -46.63,
  });

  (useGetTrucks as unknown as Mock).mockReturnValue({
    data: [],
    error: null,
    isLoading: false,
  });
});

describe("useListTruck Hook", () => {
  it("should set isLoading correctly", () => {
    (useGetTrucks as unknown as Mock).mockReturnValue({
      data: [],
      error: null,
      isLoading: true,
    });

    const { result } = renderHook(() => useListTruck({}));

    expect(result.current.isLoading).toBe(true);
    expect(setLoading).toHaveBeenCalledWith(true);
  });

  it("should display error when failing to load trucks", () => {
    (useGetTrucks as unknown as Mock).mockReturnValue({
      data: null,
      error: "Erro ao buscar caminhões",
      isLoading: false,
    });

    renderHook(() => useListTruck({}));

    expect(showSnackbar).toHaveBeenCalledWith(
      "Erro ao carregar os veículos.",
      "error"
    );
  });

  it("should filter trucks correctly", () => {
    const mockTrucks = [
      {
        id: "1",
        licensePlate: "ABC1234",
        trackerSerialNumber: "12345",
        distance: 10,
      },
      {
        id: "2",
        licensePlate: "XYZ5678",
        trackerSerialNumber: "98765",
        distance: 50,
      },
    ];

    (useGetTrucks as unknown as Mock).mockReturnValue({
      data: mockTrucks,
      error: null,
      isLoading: false,
    });
    (sortAndFilterTrucks as unknown as Mock).mockReturnValue([mockTrucks[0]]);

    const { result } = renderHook(() =>
      useListTruck({ licensePlate: "ABC1234" })
    );

    expect(result.current.trucks).toEqual([mockTrucks[0]]);
    expect(sortAndFilterTrucks).toHaveBeenCalledWith(
      mockTrucks,
      { licensePlate: "ABC1234" },
      false,
      { latitude: -23.55, longitude: -46.63 }
    );
  });

  it("should toggle distance sorting correctly", () => {
    const mockTrucks = [
      {
        id: "1",
        licensePlate: "ABC1234",
        trackerSerialNumber: "12345",
        distance: 10,
      },
      {
        id: "2",
        licensePlate: "XYZ5678",
        trackerSerialNumber: "98765",
        distance: 50,
      },
    ];

    (useGetTrucks as unknown as Mock).mockReturnValue({
      data: mockTrucks,
      error: null,
      isLoading: false,
    });
    (sortAndFilterTrucks as unknown as Mock).mockReturnValue(mockTrucks);

    const { result } = renderHook(() => useListTruck({}));

    act(() => {
      result.current.setIsDistanceDescending(true);
    });

    expect(result.current.isDistanceDescending).toBe(true);
  });
});
