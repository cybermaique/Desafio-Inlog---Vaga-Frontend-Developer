import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from ".";

describe("Home Page", () => {
  it("should render the title and subtitle correctly", () => {
    render(<Home />);

    expect(
      screen.getByText("Boas-vindas, Alexandre Borges!")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Aqui, você pode visualizar e cadastrar caminhões, além de acompanhar suas localizações no mapa."
      )
    ).toBeInTheDocument();
  });

  it("should render the image correctly", () => {
    render(<Home />);

    const img = screen.getByAltText("Home Image");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", expect.stringContaining("home.svg"));
  });
});
