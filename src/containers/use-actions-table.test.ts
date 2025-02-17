import { act, renderHook } from "@testing-library/react";
import { mutate } from "swr";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { deleteTruck } from "../services/delete-truck";
import { updateTruck } from "../services/update-truck";
import { useActionsTable } from "./use-actions-table";

const setLoading = vi.fn();
const showSnackbar = vi.fn();

vi.mock("swr", () => ({ mutate: vi.fn() }));

vi.mock("../services/delete-truck", () => ({
  deleteTruck: vi.fn(),
}));

vi.mock("../services/update-truck", () => ({
  updateTruck: vi.fn(),
}));

vi.mock("../stores/loading", () => ({
  useLoadingStore: () => ({ setLoading }),
}));

vi.mock("../stores/snackbar", () => ({
  useSnackbarStore: () => ({ showSnackbar }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useActionsTable Hook", () => {
  it("should open the edit modal", () => {
    const { result } = renderHook(() => useActionsTable());
    act(() => {
      result.current.handleEditOpen({ id: "1", name: "Caminhão Teste" } as any);
    });
    expect(result.current.selectedTruck).toEqual({
      id: "1",
      name: "Caminhão Teste",
    });
    expect(result.current.openEditDialog).toBe(true);
  });

  it("should close the edit modal", () => {
    const { result } = renderHook(() => useActionsTable());
    act(() => {
      result.current.handleEditClose();
    });
    expect(result.current.openEditDialog).toBe(false);
  });

  it("should open the delete modal", () => {
    const { result } = renderHook(() => useActionsTable());
    act(() => {
      result.current.handleDeleteOpen({
        id: "1",
        name: "Caminhão Teste",
      } as any);
    });
    expect(result.current.selectedTruck).toEqual({
      id: "1",
      name: "Caminhão Teste",
    });
    expect(result.current.openDeleteDialog).toBe(true);
  });

  it("should close the delete modal", () => {
    const { result } = renderHook(() => useActionsTable());
    act(() => {
      result.current.handleDeleteClose();
    });
    expect(result.current.openDeleteDialog).toBe(false);
  });

  it("should save the truck edit", async () => {
    (updateTruck as Mock).mockResolvedValue(undefined);
    const { result } = renderHook(() => useActionsTable());
    act(() => {
      result.current.handleEditOpen({ id: "1", name: "Caminhão Teste" } as any);
    });
    await act(async () => {
      await result.current.handleSaveEdit();
    });

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(updateTruck).toHaveBeenCalledWith("/api/caminhao/1", {
      arg: { id: "1", name: "Caminhão Teste" },
    });
    expect(mutate).toHaveBeenCalledWith("/api/caminhoes");
    expect(showSnackbar).toHaveBeenCalledWith(
      "Caminhão atualizado com sucesso!",
      "success"
    );
    expect(setLoading).toHaveBeenCalledWith(false);
  });

  it("should show error when failing to save edit", async () => {
    (updateTruck as Mock).mockRejectedValue(new Error("Erro"));
    const { result } = renderHook(() => useActionsTable());
    act(() => {
      result.current.handleEditOpen({ id: "1", name: "Caminhão Teste" } as any);
    });
    await act(async () => {
      await result.current.handleSaveEdit();
    });

    expect(showSnackbar).toHaveBeenCalledWith(
      "Erro ao atualizar caminhão!",
      "error"
    );
    expect(setLoading).toHaveBeenCalledWith(false);
  });

  it("should confirm the truck deletion", async () => {
    (deleteTruck as Mock).mockResolvedValue(undefined);
    const { result } = renderHook(() => useActionsTable());
    act(() => {
      result.current.handleDeleteOpen({
        id: "1",
        name: "Caminhão Teste",
      } as any);
    });
    await act(async () => {
      await result.current.handleConfirmDelete();
    });

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(deleteTruck).toHaveBeenCalledWith("/api/caminhao/1");
    expect(mutate).toHaveBeenCalledWith("/api/caminhoes");
    expect(showSnackbar).toHaveBeenCalledWith(
      "Caminhão excluído com sucesso!",
      "success"
    );
    expect(setLoading).toHaveBeenCalledWith(false);
  });

  it("should show error when failing to delete truck", async () => {
    (deleteTruck as Mock).mockRejectedValue(new Error("Erro"));
    const { result } = renderHook(() => useActionsTable());
    act(() => {
      result.current.handleDeleteOpen({
        id: "1",
        name: "Caminhão Teste",
      } as any);
    });
    await act(async () => {
      await result.current.handleConfirmDelete();
    });

    expect(showSnackbar).toHaveBeenCalledWith(
      "Erro ao excluir caminhão!",
      "error"
    );
    expect(setLoading).toHaveBeenCalledWith(false);
  });
});
