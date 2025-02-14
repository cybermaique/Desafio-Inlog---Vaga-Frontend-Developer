import { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePagination } from ".";

describe("usePagination Hook", () => {
  let onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  let paginationProps: TablePaginationActionsProps;

  beforeEach(() => {
    onPageChange = vi.fn();
    paginationProps = {
      count: 100,
      page: 2,
      rowsPerPage: 10,
      onPageChange,
      getItemAriaLabel: () => "",
      showFirstButton: true,
      showLastButton: true,
    };
  });

  it("should return correct initial values", () => {
    const { result } = renderHook(() => usePagination(paginationProps));
    expect(result.current.isFirstPage).toBe(false);
    expect(result.current.isLastPage).toBe(false);
  });

  it("should determine first page correctly", () => {
    const { result } = renderHook(() =>
      usePagination({ ...paginationProps, page: 0 })
    );
    expect(result.current.isFirstPage).toBe(true);
  });

  it("should determine last page correctly", () => {
    const { result } = renderHook(() =>
      usePagination({
        ...paginationProps,
        page: 9,
        count: 100,
        rowsPerPage: 10,
      })
    );
    expect(result.current.isLastPage).toBe(true);
  });

  it("should call onPageChange with first page index", async () => {
    const { result } = renderHook(() => usePagination(paginationProps));
    await result.current.handleFirstPage(
      {} as React.MouseEvent<HTMLButtonElement>
    );
    expect(onPageChange).toHaveBeenCalledWith({}, 0);
  });

  it("should call onPageChange with previous page index", async () => {
    const { result } = renderHook(() => usePagination(paginationProps));
    await result.current.handleBack({} as React.MouseEvent<HTMLButtonElement>);
    expect(onPageChange).toHaveBeenCalledWith({}, 1);
  });

  it("should call onPageChange with next page index", async () => {
    const { result } = renderHook(() => usePagination(paginationProps));
    await result.current.handleNext({} as React.MouseEvent<HTMLButtonElement>);
    expect(onPageChange).toHaveBeenCalledWith({}, 3);
  });

  it("should call onPageChange with last page index", async () => {
    const { result } = renderHook(() => usePagination(paginationProps));
    await result.current.handleLastPage(
      {} as React.MouseEvent<HTMLButtonElement>
    );
    expect(onPageChange).toHaveBeenCalledWith({}, 9);
  });
});
