import { describe, expect, it } from "vitest";
import { useLoadingStore } from "./loading";

describe("useLoadingStore", () => {
  it("deve ter o estado inicial isLoading como false", () => {
    const { isLoading } = useLoadingStore.getState();
    expect(isLoading).toBe(false);
  });

  it("deve atualizar o estado isLoading corretamente", () => {
    const { setLoading, isLoading } = useLoadingStore.getState();

    expect(isLoading).toBe(false);

    setLoading(true);

    expect(useLoadingStore.getState().isLoading).toBe(true);
  });

  it("deve alternar o estado isLoading entre true e false", () => {
    const { setLoading } = useLoadingStore.getState();

    setLoading(true);
    expect(useLoadingStore.getState().isLoading).toBe(true);

    setLoading(false);
    expect(useLoadingStore.getState().isLoading).toBe(false);
  });
});
