import { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CustomActionsComponent } from "./custom-actions-component";

const mockProps: TablePaginationActionsProps = {
  count: 100,
  page: 1,
  rowsPerPage: 10,
  onPageChange: vi.fn(),
  getItemAriaLabel: () => "",
  showFirstButton: true,
  showLastButton: true,
};

describe("CustomActionsComponent", () => {
  it("deve desativar os botões de primeira e página anterior na primeira página", () => {
    render(<CustomActionsComponent {...mockProps} page={0} />);

    expect(screen.getByLabelText("first page")).toBeDisabled();
    expect(screen.getByLabelText("previous page")).toBeDisabled();
  });

  it("deve desativar os botões de última e próxima página na última página", () => {
    render(
      <CustomActionsComponent
        {...mockProps}
        page={9}
        count={100}
        rowsPerPage={10}
      />
    );

    expect(screen.getByLabelText("next page")).toBeDisabled();
    expect(screen.getByLabelText("last page")).toBeDisabled();
  });

  it("deve chamar onPageChange ao clicar nos botões ativos", () => {
    render(<CustomActionsComponent {...mockProps} />);

    fireEvent.click(screen.getByLabelText("next page"));
    expect(mockProps.onPageChange).toHaveBeenCalled();
  });
});
