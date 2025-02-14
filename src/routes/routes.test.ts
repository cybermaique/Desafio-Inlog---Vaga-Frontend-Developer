import { describe, expect, it } from "vitest";
import { routes } from ".";

describe("Routes", () => {
  it("deve ter a rota da página inicial configurada corretamente", () => {
    const homeRoute = routes.find((route) => route.path === "/");
    expect(homeRoute).toBeDefined();
    expect(homeRoute?.title).toBe("Página inicial");
    expect(homeRoute?.icon).toBeDefined();
    expect(homeRoute?.element).toBeDefined();
  });

  it("deve ter a rota de listagem de caminhões configurada corretamente", () => {
    const truckListRoute = routes.find(
      (route) => route.path === "/caminhoes/listar"
    );
    expect(truckListRoute).toBeDefined();
    expect(truckListRoute?.title).toBe("Listagem de Caminhões");
    expect(truckListRoute?.icon).toBeDefined();
    expect(truckListRoute?.element).toBeDefined();
  });

  it("deve ter a rota de cadastrar caminhão configurada corretamente", () => {
    const addTruckRoute = routes.find(
      (route) => route.path === "/caminhoes/cadastrar"
    );
    expect(addTruckRoute).toBeDefined();
    expect(addTruckRoute?.title).toBe("Cadastrar Caminhão");
    expect(addTruckRoute?.icon).toBeDefined();
    expect(addTruckRoute?.element).toBeDefined();
  });
});
