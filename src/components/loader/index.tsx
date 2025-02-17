import { Backdrop, CircularProgress } from "@mui/material";
import { useLoadingStore } from "../../stores/loading";
import { colors } from "../../styles/colors";

export const Loader = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  return (
    <Backdrop
      sx={{
        color: colors.royalAzure,
        zIndex: (theme) => theme.zIndex.drawer + 999,
      }}
      open={isLoading}
      data-testid="backdrop"
    >
      <CircularProgress color="inherit" data-testid="circular-progress" />
    </Backdrop>
  );
};
