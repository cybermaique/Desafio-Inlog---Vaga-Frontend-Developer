import { Server } from "miragejs";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { makeServer } from "./server";

let server: Server;

beforeEach(() => {
  server = makeServer();
});

afterEach(() => {
  server.shutdown();
});

describe("Mirage Server", () => {
  it("deve retornar a lista de caminhões", async () => {
    const response = await fetch("/api/caminhoes");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.trucks).toHaveLength(27);
    expect(data.trucks[0]).toHaveProperty("id");
    expect(data.trucks[0]).toHaveProperty("identifier");
    expect(data.trucks[0]).toHaveProperty("license_plate");
  });

  it("deve cadastrar um novo caminhão", async () => {
    const newTruck = {
      identifier: "Caminhão 4 - São Paulo (SP)",
      license_plate: "XYZ-5678",
      tracker_serial_number: "T11111",
      coordinates: { latitude: -23.55052, longitude: -46.633308 },
    };

    const response = await fetch("/api/caminhao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTruck),
    });
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.truck).toHaveProperty("id");
    expect(data.truck.identifier).toBe(newTruck.identifier);
  });

  it("deve retornar erro ao tentar cadastrar um caminhão com dados inválidos", async () => {
    const invalidTruck = {
      license_plate: "XYZ-5678",
      tracker_serial_number: "T11111",
      coordinates: { latitude: -23.55052, longitude: -46.633308 },
    };

    const response = await fetch("/api/caminhao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidTruck),
    });

    expect(response.status).toBe(400);
  });
});
