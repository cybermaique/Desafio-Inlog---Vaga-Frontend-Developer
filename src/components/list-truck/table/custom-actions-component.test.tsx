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
  it("should disable the first and previous page buttons on the first page", () => {
    render(<CustomActionsComponent {...mockProps} page={0} />);

    expect(screen.getByLabelText("first page")).toBeDisabled();
    expect(screen.getByLabelText("previous page")).toBeDisabled();
  });

  it("should disable the last and next page buttons on the last page", () => {
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

  it("should call onPageChange when clicking on active buttons", () => {
    render(<CustomActionsComponent {...mockProps} />);

    fireEvent.click(screen.getByLabelText("next page"));
    expect(mockProps.onPageChange).toHaveBeenCalled();
  });
});
