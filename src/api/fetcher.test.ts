import { expect, it, vi } from "vitest";
import { fetcher } from "./fetcher";

global.fetch = vi.fn().mockResolvedValue({
  json: vi.fn().mockResolvedValue({ trucks: ["truck1", "truck2"] }),
});

it("deve retornar os caminhões ao chamar fetcher", async () => {
  const result = await fetcher("https://fakeurl.com");
  expect(result).toEqual(["truck1", "truck2"]);
  expect(fetch).toHaveBeenCalledWith("https://fakeurl.com");
});
