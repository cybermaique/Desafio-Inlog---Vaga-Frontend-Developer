import { describe, expect, it } from "vitest";
import { routes } from ".";

describe("Routes", () => {
  it("should have the home page route configured correctly", () => {
    const homeRoute = routes.find((route) => route.path === "/");
    expect(homeRoute).toBeDefined();
    expect(homeRoute?.title).toBe("Página inicial");
    expect(homeRoute?.icon).toBeDefined();
    expect(homeRoute?.element).toBeDefined();
  });

  it("should have the truck listing route configured correctly", () => {
    const truckListRoute = routes.find(
      (route) => route.path === "/caminhoes/listar"
    );
    expect(truckListRoute).toBeDefined();
    expect(truckListRoute?.title).toBe("Listagem de Caminhões");
    expect(truckListRoute?.icon).toBeDefined();
    expect(truckListRoute?.element).toBeDefined();
  });

  it("should have the add truck route configured correctly", () => {
    const addTruckRoute = routes.find(
      (route) => route.path === "/caminhoes/cadastrar"
    );
    expect(addTruckRoute).toBeDefined();
    expect(addTruckRoute?.title).toBe("Cadastrar Caminhão");
    expect(addTruckRoute?.icon).toBeDefined();
    expect(addTruckRoute?.element).toBeDefined();
  });
});
