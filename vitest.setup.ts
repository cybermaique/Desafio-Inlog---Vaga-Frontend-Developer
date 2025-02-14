import { vi } from "vitest";

vi.mock("../../assets/icons/location-truck.svg", () => ({
  default: "mocked-location-truck.svg",
}));
