import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from ".";

describe("Home Page", () => {
  it("deve renderizar o título e o subtítulo corretamente", () => {
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

  it("deve renderizar a imagem corretamente", () => {
    render(<Home />);

    const img = screen.getByAltText("Home Image");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", expect.stringContaining("home.svg"));
  });
});
