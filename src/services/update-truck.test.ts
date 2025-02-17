import { describe, expect, it } from "vitest";
import { TRUCKS } from "../__mocks__/trucks-server.mock";
import { server } from "../tests/setup-tests";
import { updateTruck } from "./update-truck";

describe("updateTruck", () => {
  it("should successfully update a truck", async () => {
    const mockTruck = { ...TRUCKS[0], license_plate: "XYZ-9876" };

    const result = await updateTruck(`/api/caminhao/${mockTruck.id}`, {
      arg: mockTruck,
    });

    expect(result).toEqual(mockTruck);

    const updatedTruck = server.schema.find("truck", mockTruck.id);
    expect(updatedTruck?.attrs).toEqual(mockTruck);
  });

  it("should throw an error when the truck does not exist", async () => {
    const nonExistingTruck = { ...TRUCKS[0], id: "999" };

    await expect(
      updateTruck(`/api/caminhao/${nonExistingTruck.id}`, {
        arg: nonExistingTruck,
      })
    ).rejects.toThrowError("Erro ao atualizar caminhão");
  });
});
