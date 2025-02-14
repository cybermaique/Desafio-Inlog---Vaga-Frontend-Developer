import { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions";
import { useCallback } from "react";

export const usePagination = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: TablePaginationActionsProps) => {
  const handleFirstPage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => onPageChange(event, 0),
    [onPageChange]
  );

  const handleBack = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      onPageChange(event, page - 1),
    [onPageChange, page]
  );

  const handleNext = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      onPageChange(event, page + 1),
    [onPageChange, page]
  );

  const handleLastPage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1)),
    [onPageChange, count, rowsPerPage]
  );

  const isFirstPage = page === 0;
  const isLastPage = page >= Math.ceil(count / rowsPerPage) - 1;

  return {
    handleFirstPage,
    handleBack,
    handleNext,
    handleLastPage,
    isFirstPage,
    isLastPage,
  };
};
