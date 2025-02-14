import { describe, expect, it } from "vitest";
import { useLoadingStore } from "./loading";

describe("useLoadingStore", () => {
  it("should have the initial state of isLoading as false", () => {
    const { isLoading } = useLoadingStore.getState();
    expect(isLoading).toBe(false);
  });

  it("should update the isLoading state correctly", () => {
    const { setLoading, isLoading } = useLoadingStore.getState();

    expect(isLoading).toBe(false);

    setLoading(true);

    expect(useLoadingStore.getState().isLoading).toBe(true);
  });

  it("should toggle the isLoading state between true and false", () => {
    const { setLoading } = useLoadingStore.getState();

    setLoading(true);
    expect(useLoadingStore.getState().isLoading).toBe(true);

    setLoading(false);
    expect(useLoadingStore.getState().isLoading).toBe(false);
  });
});
