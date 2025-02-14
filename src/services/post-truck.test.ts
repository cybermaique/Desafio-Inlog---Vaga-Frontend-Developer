import { describe, expect, it, vi } from "vitest";
import { addTruck } from "./post-truck";

vi.mock("../api/addTruck", () => ({
  addTruck: vi.fn(),
}));

describe("addTruck", () => {
  it("should successfully register the truck", async () => {
    const mockResponse = {
      id: "1",
      identifier: "12345",
      license_plate: "XYZ123",
      tracker_serial_number: "ABC456",
      coordinates: { latitude: 0, longitude: 0 },
      image: "",
    };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const url = "https://api.example.com/trucks";
    const newTruck = {
      identifier: "12345",
      license_plate: "XYZ123",
      tracker_serial_number: "ABC456",
      coordinates: { latitude: 0, longitude: 0 },
      image: "",
    };

    const result = await addTruck(url, { arg: newTruck });

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTruck),
    });
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when the request fails", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({}),
    });

    const url = "https://api.example.com/trucks";
    const newTruck = {
      identifier: "12345",
      license_plate: "XYZ123",
      tracker_serial_number: "ABC456",
      coordinates: { latitude: 0, longitude: 0 },
      image: "",
    };

    await expect(addTruck(url, { arg: newTruck })).rejects.toThrowError(
      "Erro ao cadastrar caminhão"
    );
  });
});
