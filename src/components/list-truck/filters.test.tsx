import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TruckFilters } from "./filters";

const mockSetFilters = vi.fn();
const mockOnSearch = vi.fn();
const mockOnKeyDown = vi.fn();
const mockOnClear = vi.fn();

const initialFilters = {
  licensePlate: "",
  trackerSerialNumber: "",
  maxDistance: "",
};

describe("TruckFilters", () => {
  it("renderiza os campos de input e botões", () => {
    render(
      <TruckFilters
        filters={initialFilters}
        setFilters={mockSetFilters}
        onSearch={mockOnSearch}
        onKeyDown={mockOnKeyDown}
        onClear={mockOnClear}
      />
    );

    expect(screen.getByLabelText(/Placa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rastreador/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Distância Máxima/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Limpar/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Buscar/i })).toBeDisabled();
  });

  it("habilita os botões quando há filtros preenchidos", () => {
    render(
      <TruckFilters
        filters={{ ...initialFilters, licensePlate: "ABC-1234" }}
        setFilters={mockSetFilters}
        onSearch={mockOnSearch}
        onKeyDown={mockOnKeyDown}
        onClear={mockOnClear}
      />
    );

    expect(screen.getByRole("button", { name: /Limpar/i })).not.toBeDisabled();
    expect(screen.getByRole("button", { name: /Buscar/i })).not.toBeDisabled();
  });

  it("chama setFilters corretamente ao digitar no campo de Placa", () => {
    render(
      <TruckFilters
        filters={initialFilters}
        setFilters={mockSetFilters}
        onSearch={mockOnSearch}
        onKeyDown={mockOnKeyDown}
        onClear={mockOnClear}
      />
    );

    const plateInput = screen.getByLabelText(/Placa/i);
    fireEvent.change(plateInput, { target: { value: "abc1234" } });

    expect(mockSetFilters).toHaveBeenCalledWith(
      expect.objectContaining({ licensePlate: "ABC-1234" })
    );
  });

  it("chama setFilters corretamente ao digitar no campo de Rastreador", () => {
    render(
      <TruckFilters
        filters={initialFilters}
        setFilters={mockSetFilters}
        onSearch={mockOnSearch}
        onKeyDown={mockOnKeyDown}
        onClear={mockOnClear}
      />
    );

    const trackerInput = screen.getByLabelText(/Rastreador/i);
    fireEvent.change(trackerInput, { target: { value: "abcd1234efg" } });

    expect(mockSetFilters).toHaveBeenCalledWith(
      expect.objectContaining({ trackerSerialNumber: "ABCD1234EF" })
    );
  });

  it("chama onSearch ao clicar no botão Buscar", () => {
    render(
      <TruckFilters
        filters={{ ...initialFilters, licensePlate: "XYZ-5678" }}
        setFilters={mockSetFilters}
        onSearch={mockOnSearch}
        onKeyDown={mockOnKeyDown}
        onClear={mockOnClear}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Buscar/i }));
    expect(mockOnSearch).toHaveBeenCalled();
  });

  it("chama onClear ao clicar no botão Limpar", () => {
    render(
      <TruckFilters
        filters={{ ...initialFilters, licensePlate: "XYZ-5678" }}
        setFilters={mockSetFilters}
        onSearch={mockOnSearch}
        onKeyDown={mockOnKeyDown}
        onClear={mockOnClear}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Limpar/i }));
    expect(mockOnClear).toHaveBeenCalled();
  });
});
