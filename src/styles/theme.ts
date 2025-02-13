import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

const theme = createTheme({
  palette: {
    background: {
      default: colors.brightGray,
    },
    primary: {
      main: colors.smokyBlack,
    },
  },
});

export default theme;
