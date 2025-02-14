import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageHeader from ".";

describe("PageHeader Component", () => {
  it("deve renderizar corretamente com título e subtítulo", () => {
    render(<PageHeader title="Título Teste" subtitle="Subtítulo Teste" />);

    expect(screen.getByText("Título Teste")).toBeInTheDocument();
    expect(screen.getByText("Subtítulo Teste")).toBeInTheDocument();
  });

  it("deve aplicar as variantes corretas de tipografia", () => {
    render(<PageHeader title="Título Teste" subtitle="Subtítulo Teste" />);

    expect(screen.getByText("Título Teste")).toHaveAttribute(
      "class",
      expect.stringContaining("MuiTypography-h5")
    );
    expect(screen.getByText("Subtítulo Teste")).toHaveAttribute(
      "class",
      expect.stringContaining("MuiTypography-subtitle1")
    );
  });
});
