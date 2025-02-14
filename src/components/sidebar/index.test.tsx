import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Sidebar from ".";
import { routes } from "../../routes";
import { colors } from "../../styles/colors";

describe("Sidebar", () => {
  it("should render menu items correctly", () => {
    render(
      <MemoryRouter>
        <Sidebar open={true} />
      </MemoryRouter>
    );

    const visibleRoutes = routes.filter(({ path }) => path !== "*");

    visibleRoutes.forEach(({ title, path }) => {
      expect(screen.getByText(title)).toBeInTheDocument();

      const link = screen.getByRole("link", { name: title });
      const linkHref = new URL(
        link.getAttribute("href")!,
        window.location.origin
      ).pathname;

      const expectedPath = path.startsWith("/") ? path : `/${path}`;

      expect(linkHref).toBe(expectedPath);
    });
  });

  it("should show the title only when the open prop is true", () => {
    render(
      <MemoryRouter>
        <Sidebar open={true} />
      </MemoryRouter>
    );

    const visibleRoutes = routes.filter(({ path }) => path !== "*");

    visibleRoutes.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    cleanup();

    render(
      <MemoryRouter>
        <Sidebar open={false} />
      </MemoryRouter>
    );

    visibleRoutes.forEach(({ title }) => {
      expect(screen.queryByText(title)).not.toBeInTheDocument();
    });
  });

  it("should apply the active class to the correct link", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Sidebar open={true} />
      </MemoryRouter>
    );

    const activeLink = screen.getByRole("link", { name: "Página inicial" });
    expect(activeLink).toHaveStyle(`background-color: ${colors.brightGray}`);
  });
});
