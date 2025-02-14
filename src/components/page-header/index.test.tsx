import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageHeader from ".";

describe("PageHeader Component", () => {
  it("should render correctly with title and subtitle", () => {
    render(<PageHeader title="Título Teste" subtitle="Subtítulo Teste" />);

    expect(screen.getByText("Título Teste")).toBeInTheDocument();
    expect(screen.getByText("Subtítulo Teste")).toBeInTheDocument();
  });

  it("should apply the correct typography variants", () => {
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
