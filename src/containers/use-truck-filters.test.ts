import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTruckFilters } from "./use-truck-filters";

describe("useTruckFilters Hook", () => {
  it("should initialize filters correctly", () => {
    const { result } = renderHook(() => useTruckFilters());

    expect(result.current.filters).toEqual({
      licensePlate: "",
      trackerSerialNumber: "",
      maxDistance: "",
    });

    expect(result.current.appliedFilters).toEqual({
      licensePlate: "",
      trackerSerialNumber: "",
      maxDistance: "",
    });
  });

  it("should apply filters when handleSearch is called", () => {
    const { result } = renderHook(() => useTruckFilters());

    act(() => {
      result.current.setFilters({
        licensePlate: "ABC1234",
        trackerSerialNumber: "12345",
        maxDistance: "50",
      });
    });

    act(() => {
      result.current.handleSearch();
    });

    expect(result.current.appliedFilters).toEqual({
      licensePlate: "ABC1234",
      trackerSerialNumber: "12345",
      maxDistance: "50",
    });
  });

  it("should trigger handleSearch when Enter is pressed in handleKeyDown", () => {
    const { result } = renderHook(() => useTruckFilters());

    act(() => {
      result.current.setFilters({
        licensePlate: "XYZ5678",
        trackerSerialNumber: "98765",
        maxDistance: "100",
      });
    });

    act(() => {
      result.current.handleKeyDown({ key: "Enter" } as any);
    });

    expect(result.current.appliedFilters).toEqual({
      licensePlate: "XYZ5678",
      trackerSerialNumber: "98765",
      maxDistance: "100",
    });
  });

  it("should clear filters when handleClear is called", () => {
    const { result } = renderHook(() => useTruckFilters());

    act(() => {
      result.current.setFilters({
        licensePlate: "DEF4321",
        trackerSerialNumber: "54321",
        maxDistance: "200",
      });
    });

    act(() => {
      result.current.handleClear();
    });

    expect(result.current.filters).toEqual({
      licensePlate: "",
      trackerSerialNumber: "",
      maxDistance: "",
    });

    expect(result.current.appliedFilters).toEqual({
      licensePlate: "",
      trackerSerialNumber: "",
      maxDistance: "",
    });
  });
});
