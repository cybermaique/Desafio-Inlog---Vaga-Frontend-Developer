import { renderHook, waitFor } from "@testing-library/react";
import useSWR from "swr";
import { describe, expect, it, Mock, vi } from "vitest";
import { useGetTrucks } from "./get-trucks";

vi.mock("swr");
vi.mock("../api/fetcher", () => ({
  fetcher: vi.fn(),
}));

describe("useGetTrucks", () => {
  it("should return truck data when the request is successful", async () => {
    const trucksMock = [
      {
        id: "1",
        identifier: "12345",
        license_plate: "ABC-1234",
        tracker_serial_number: "SN123456",
        coordinates: {
          latitude: -23.55052,
          longitude: -46.633308,
        },
      },
    ];
    (useSWR as Mock).mockReturnValue({ data: trucksMock, error: null });

    const { result } = renderHook(() => useGetTrucks());

    await waitFor(() => expect(result.current.data).toBeDefined());

    expect(result.current.data).toEqual(trucksMock);
    expect(result.current.error).toBeNull();
  });

  it("should return an error when the request fails", async () => {
    const errorMock = new Error("Error loading trucks");
    (useSWR as Mock).mockReturnValue({ data: null, error: errorMock });

    const { result } = renderHook(() => useGetTrucks());

    await waitFor(() => expect(result.current.data).toBeNull());

    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(errorMock);
  });
});
