import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Layout from ".";

vi.mock("../sidebar/index", () => ({
  default: ({ open }: { open: boolean }) => (
    <div data-testid="Sidebar">
      {open ? "Sidebar Aberto" : "Sidebar Fechado"}
    </div>
  ),
}));

vi.mock("../toolbar/index", () => ({
  default: ({ onClickMenu }: { onClickMenu: () => void }) => (
    <button data-testid="ToolbarButton" onClick={onClickMenu}>
      Toggle Sidebar
    </button>
  ),
}));

describe("Layout Component", () => {
  it("deve renderizar Toolbar, Sidebar e children corretamente", () => {
    render(
      <BrowserRouter>
        <Layout>
          <div data-testid="Content">Conteúdo</div>
        </Layout>
      </BrowserRouter>
    );

    expect(screen.getByTestId("ToolbarButton")).toBeInTheDocument();
    expect(screen.getByTestId("Sidebar")).toHaveTextContent("Sidebar Aberto");
    expect(screen.getByTestId("Content")).toHaveTextContent("Conteúdo");
  });

  it("deve alternar a visibilidade do Sidebar ao clicar no botão do Toolbar", () => {
    render(
      <BrowserRouter>
        <Layout>
          <div data-testid="Content">Conteúdo</div>
        </Layout>
      </BrowserRouter>
    );

    const toolbarButton = screen.getByTestId("ToolbarButton");
    expect(screen.getByTestId("Sidebar")).toHaveTextContent("Sidebar Aberto");

    fireEvent.click(toolbarButton);
    expect(screen.getByTestId("Sidebar")).toHaveTextContent("Sidebar Fechado");

    fireEvent.click(toolbarButton);
    expect(screen.getByTestId("Sidebar")).toHaveTextContent("Sidebar Aberto");
  });
});
