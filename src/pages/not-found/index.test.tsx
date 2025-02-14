import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import NotFound from "./index";

describe("NotFound", () => {
  it("deve renderizar a imagem e o texto corretamente", () => {
    render(<NotFound />);

    const image = screen.getByAltText(/not found image/i);
    expect(image).toBeInTheDocument();

    const text = screen.getByText(/Opa, URL não encontrada!/i);
    expect(text).toBeInTheDocument();
  });
});
