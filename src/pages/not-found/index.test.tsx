import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "./index";

describe("NotFound", () => {
  it("should render the image and text correctly", () => {
    render(<NotFound />);

    const image = screen.getByAltText(/not found image/i);
    expect(image).toBeInTheDocument();

    const text = screen.getByText(/Opa, URL não encontrada!/i);
    expect(text).toBeInTheDocument();
  });
});
