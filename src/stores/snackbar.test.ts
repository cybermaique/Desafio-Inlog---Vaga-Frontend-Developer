import { describe, expect, it } from "vitest";
import { useSnackbarStore } from "./snackbar";

describe("useSnackbarStore", () => {
  it("should have the correct initial state", () => {
    const { open, message, severity } = useSnackbarStore.getState();
    expect(open).toBe(false);
    expect(message).toBe("");
    expect(severity).toBe("info");
  });

  it("should display the snackbar with the correct message and severity", () => {
    const { showSnackbar } = useSnackbarStore.getState();

    showSnackbar("Testing snackbar", "success");

    const { open, message, severity } = useSnackbarStore.getState();
    expect(open).toBe(true);
    expect(message).toBe("Testing snackbar");
    expect(severity).toBe("success");
  });

  it("should close the snackbar correctly", () => {
    const { closeSnackbar, showSnackbar } = useSnackbarStore.getState();

    showSnackbar("Testing close", "error");
    expect(useSnackbarStore.getState().open).toBe(true);

    closeSnackbar();
    expect(useSnackbarStore.getState().open).toBe(false);
    expect(useSnackbarStore.getState().message).toBe("");
    expect(useSnackbarStore.getState().severity).toBe("info");
  });

  it('should use "info" as the default severity when showing the snackbar', () => {
    const { showSnackbar } = useSnackbarStore.getState();

    showSnackbar("Message without specified severity");
    expect(useSnackbarStore.getState().severity).toBe("info");
  });
});
