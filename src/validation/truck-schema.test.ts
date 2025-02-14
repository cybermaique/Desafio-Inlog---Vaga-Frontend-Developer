import { describe, expect, it } from "vitest";
import truckSchema from "./truck-schema";

describe("truckSchema", () => {
  it("deve validar corretamente os dados válidos", () => {
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

  it("deve retornar erro para identificador com menos de 3 caracteres", () => {
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

  it("deve retornar erro para placa inválida", () => {
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

  it("deve retornar erro para latitude inválida", () => {
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

  it("deve retornar 'Campo obrigatório' quando um campo obrigatório está faltando", () => {
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

  it("deve retornar 'Campo obrigatório' para tipo inválido", () => {
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
