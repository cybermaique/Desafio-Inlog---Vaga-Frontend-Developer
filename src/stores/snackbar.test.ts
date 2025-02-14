import { describe, expect, it } from "vitest";
import { useSnackbarStore } from "./snackbar";

describe("useSnackbarStore", () => {
  it("deve ter o estado inicial correto", () => {
    const { open, message, severity } = useSnackbarStore.getState();
    expect(open).toBe(false);
    expect(message).toBe("");
    expect(severity).toBe("info");
  });

  it("deve exibir o snackbar com a mensagem e a severidade corretas", () => {
    const { showSnackbar } = useSnackbarStore.getState();

    showSnackbar("Testando snackbar", "success");

    const { open, message, severity } = useSnackbarStore.getState();
    expect(open).toBe(true);
    expect(message).toBe("Testando snackbar");
    expect(severity).toBe("success");
  });

  it("deve fechar o snackbar corretamente", () => {
    const { closeSnackbar, showSnackbar } = useSnackbarStore.getState();

    showSnackbar("Testando fechamento", "error");
    expect(useSnackbarStore.getState().open).toBe(true);

    closeSnackbar();
    expect(useSnackbarStore.getState().open).toBe(false);
    expect(useSnackbarStore.getState().message).toBe("");
    expect(useSnackbarStore.getState().severity).toBe("info");
  });

  it('deve usar "info" como severidade padrão ao exibir o snackbar', () => {
    const { showSnackbar } = useSnackbarStore.getState();

    showSnackbar("Mensagem sem severidade especificada");
    expect(useSnackbarStore.getState().severity).toBe("info");
  });
});
