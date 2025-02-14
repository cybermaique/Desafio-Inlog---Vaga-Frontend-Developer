import { describe, expect, it } from "vitest";
import truckSchema from "./truck-schema";

describe("truckSchema", () => {
  it("should validate valid data correctly", () => {
    const data = {
      identifier: "TRK123",
      license_plate: "ABC-1234",
      tracker_serial_number: "SN12345",
      latitude: 40.7128,
      longitude: -74.006,
    };

    const result = truckSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should return error for identifier with less than 3 characters", () => {
    const data = {
      identifier: "TR",
      license_plate: "ABC-1234",
      tracker_serial_number: "SN12345",
      latitude: 40.7128,
      longitude: -74.006,
    };

    const result = truckSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (result.error) {
      expect(result.error.errors[0].message).toBe(
        "O identificador deve ter pelo menos 3 caracteres"
      );
    }
  });

  it("should return error for invalid license plate", () => {
    const data = {
      identifier: "TRK123",
      license_plate: "ABC-12345",
      tracker_serial_number: "SN12345",
      latitude: 40.7128,
      longitude: -74.006,
    };

    const result = truckSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (result.error) {
      expect(result.error.errors[0].message).toBe("Placa inválida");
    }
  });

  it("should return error for invalid latitude", () => {
    const data = {
      identifier: "TRK123",
      license_plate: "ABC-1234",
      tracker_serial_number: "SN12345",
      latitude: 100,
      longitude: -74.006,
    };

    const result = truckSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (result.error) {
      expect(result.error.errors[0].message).toBe("Latitude inválida");
    }
  });

  it("should return 'Campo obrigatório' when a required field is missing", () => {
    const data = {
      license_plate: "ABC-1234",
      tracker_serial_number: "SN12345",
      latitude: 40.7128,
      longitude: -74.006,
    };

    const result = truckSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (result.error) {
      expect(result.error.errors[0].message).toBe("Campo obrigatório");
    }
  });

  it("should return 'Campo obrigatório' for invalid type", () => {
    const data = {
      identifier: "TRK123",
      license_plate: "ABC-1234",
      tracker_serial_number: "SN12345",
      latitude: "40.7128",
      longitude: -74.006,
    };

    const result = truckSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (result.error) {
      expect(result.error.errors[0].message).toBe("Campo obrigatório");
    }
  });
});
