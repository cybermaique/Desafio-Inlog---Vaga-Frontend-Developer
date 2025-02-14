import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Toolbar from ".";

describe("Toolbar Component", () => {
  it("deve renderizar corretamente", () => {
    render(
      <BrowserRouter>
        <Toolbar onClickMenu={vi.fn()} />
      </BrowserRouter>
    );

    expect(screen.getByRole("img", { name: /inlog/i })).toBeInTheDocument();
    expect(screen.getByText("ALEXANDRE")).toBeInTheDocument();
    expect(screen.getByTestId("MenuIcon")).toBeInTheDocument();
    expect(screen.getByTestId("KeyboardArrowDownIcon")).toBeInTheDocument();
  });

  it("deve chamar onClickMenu ao clicar no ícone de menu", () => {
    const onClickMenuMock = vi.fn();
    render(
      <BrowserRouter>
        <Toolbar onClickMenu={onClickMenuMock} />
      </BrowserRouter>
    );

    const menuButton = screen.getByTestId("MenuIcon");
    fireEvent.click(menuButton);
    expect(onClickMenuMock).toHaveBeenCalled();
  });

  it("deve chamar handleLogout ao clicar em 'Sair'", () => {
    render(
      <BrowserRouter>
        <Toolbar onClickMenu={vi.fn()} />
      </BrowserRouter>
    );

    const avatarBox = screen.getByText("ALEXANDRE").closest("div");
    fireEvent.click(avatarBox!);

    const logoutButton = screen.getByText("Sair");
    fireEvent.click(logoutButton);

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
