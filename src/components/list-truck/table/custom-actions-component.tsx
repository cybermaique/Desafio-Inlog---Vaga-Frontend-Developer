import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Box, IconButton } from "@mui/material";
import { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions";
import { usePagination } from "../../../hooks/use-pagination";

export const CustomActionsComponent = (props: TablePaginationActionsProps) => {
  const {
    handleFirstPage,
    handleBack,
    handleNext,
    handleLastPage,
    isFirstPage,
    isLastPage,
  } = usePagination(props);

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPage}
        disabled={isFirstPage}
        aria-label="first page"
      >
        <FirstPageIcon sx={{ fontSize: 31 }} />
      </IconButton>
      <IconButton
        onClick={handleBack}
        disabled={isFirstPage}
        aria-label="previous page"
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        onClick={handleNext}
        disabled={isLastPage}
        aria-label="next page"
      >
        <ArrowForwardIosIcon />
      </IconButton>
      <IconButton
        onClick={handleLastPage}
        disabled={isLastPage}
        aria-label="last page"
      >
        <LastPageIcon sx={{ fontSize: 31 }} />
      </IconButton>
    </Box>
  );
};
