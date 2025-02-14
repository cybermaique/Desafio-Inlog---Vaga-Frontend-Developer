import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SWRConfig } from "swr";
import { describe, expect, it, Mock, vi } from "vitest";
import AddTruck from ".";
import useUserLocation from "../../hooks/use-user-location";
import { useLoadingStore } from "../../stores/loading";

vi.mock("../../stores/loading", () => ({
  useLoadingStore: vi.fn().mockReturnValue({
    setLoading: vi.fn(),
  }),
}));

vi.mock("swr/mutation", async (importOriginal) => {
  const actual = (await importOriginal()) as { useSWRMutation: Function };
  return {
    ...actual,
    useSWRMutation: vi.fn().mockReturnValue({
      trigger: vi.fn(),
      isMutating: false,
    }),
  };
});

vi.mock("../../hooks/use-user-location", () => ({
  __esModule: true,
  default: vi
    .fn()
    .mockReturnValue({ latitude: -23.55052, longitude: -46.633308 }),
}));

vi.stubGlobal("navigator", {
  geolocation: {
    getCurrentPosition: vi.fn().mockImplementation((success) =>
      success({
        coords: { latitude: -23.55052, longitude: -46.633308 },
      })
    ),
  },
});

describe("AddTruck", () => {
  it("should render the form correctly", () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <AddTruck />
      </SWRConfig>
    );

    expect(screen.getByLabelText(/identificador/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/placa/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/número de série do rastreador/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/selecione a localização no mapa/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/salvar caminhão/i)).toBeInTheDocument();
  });

  it("should call onSubmit with valid data", async () => {
    const mockSetLoading = vi.fn();

    (useLoadingStore as unknown as Mock).mockReturnValue({
      setLoading: mockSetLoading,
    });

    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <AddTruck />
      </SWRConfig>
    );

    const identifierInput = screen.getByLabelText(/identificador/i);
    const licensePlateInput = screen.getByLabelText(/placa/i);
    const trackerSerialNumberInput = screen.getByLabelText(
      /número de série do rastreador/i
    );
    const submitButton = screen.getByText(/salvar caminhão/i);

    fireEvent.change(identifierInput, { target: { value: "Caminhão 1" } });
    fireEvent.change(licensePlateInput, { target: { value: "XYZ-1234" } });
    fireEvent.change(trackerSerialNumberInput, { target: { value: "T12345" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true);
    });
  });

  it("should show error when required fields are not filled", async () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <AddTruck />
      </SWRConfig>
    );

    const submitButton = screen.getByText(/salvar caminhão/i);

    fireEvent.click(submitButton);

    await waitFor(() => {
      const errors = screen.getAllByText(/campo obrigatório/i);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  it("should call the location button and update the position", async () => {
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <AddTruck />
      </SWRConfig>
    );

    const locationButton = screen.getByText(/usar minha localização/i);

    fireEvent.click(locationButton);

    await waitFor(() => {
      expect(useUserLocation).toHaveBeenCalled();
    });
  });
});
