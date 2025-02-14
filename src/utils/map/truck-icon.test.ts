import L from "leaflet";
import { describe, expect, it, vi } from "vitest";
import truckIcon from "./truck-icon";

vi.mock("../../assets/icons/location-truck.svg", () => ({
  default: "mocked-location-truck.svg",
}));

describe("truckIcon", () => {
  it("should create a Leaflet icon with the correct properties", () => {
    expect(truckIcon).toBeInstanceOf(L.Icon);
    expect(truckIcon.options.iconUrl).toBe("mocked-location-truck.svg");
    expect(truckIcon.options.iconAnchor).toEqual([20, 40]);
    expect(truckIcon.options.popupAnchor).toEqual([0, -40]);
  });
});
