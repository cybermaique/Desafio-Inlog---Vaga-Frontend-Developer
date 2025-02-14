import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import useUserLocation from ".";

describe("useUserLocation", () => {
  beforeEach(() => {
    Object.defineProperty(global.navigator, "geolocation", {
      value: {
        getCurrentPosition: vi.fn(),
      },
      writable: true,
    });
  });

  it("deve retornar a localização do usuário corretamente", async () => {
    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.006,
      },
    };
    (navigator.geolocation.getCurrentPosition as Mock).mockImplementationOnce(
      (success) => {
        success(mockPosition);
      }
    );

    const { result } = renderHook(() => useUserLocation());

    await waitFor(() => result.current !== null);

    expect(result.current).toEqual({
      latitude: 40.7128,
      longitude: -74.006,
    });
  });

  it("deve lidar com erro ao obter a localização", async () => {
    (navigator.geolocation.getCurrentPosition as Mock).mockImplementationOnce(
      (_, error) => {
        error(new Error("Erro ao obter a localização"));
      }
    );

    const { result } = renderHook(() => useUserLocation());

    await waitFor(() => result.current === null);

    expect(result.current).toBeNull();
  });
});
