import { Backdrop, CircularProgress } from "@mui/material";
import { useLoadingStore } from "../stores/loading";

export const Loader = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <Backdrop
      sx={{ color: "#002368", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
