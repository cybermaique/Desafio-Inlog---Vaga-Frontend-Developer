import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from ".";

describe("Footer", () => {
  it("should render the footer content correctly", () => {
    render(<Footer />);

    expect(
      screen.getByText("Grupo Inlog - TruckTracker Gestão de Caminhões")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Alameda Dr. Carlos de Carvalho, 373 – Centro")
    ).toBeInTheDocument();
    expect(screen.getByText("Curitiba – PR, 80410-180")).toBeInTheDocument();
    expect(
      screen.getByText("Contato comercial: (41) 98753-9983")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Demais assuntos: (41) 3281-8181")
    ).toBeInTheDocument();
  });

  it("should render the icon buttons correctly", () => {
    render(<Footer />);

    const facebookIcon = screen.getByTestId("FacebookIcon");
    const instagramIcon = screen.getByTestId("InstagramIcon");
    const linkedinIcon = screen.getByTestId("LinkedInIcon");

    expect(facebookIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();
    expect(linkedinIcon).toBeInTheDocument();
  });
});
