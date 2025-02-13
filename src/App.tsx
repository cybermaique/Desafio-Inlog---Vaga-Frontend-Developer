import { Alert, CssBaseline, Snackbar, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import { fetcher } from "./api/fetcher";
import Layout from "./components/layout.tsx";
import { Loader } from "./components/loader.tsx";
import AppRoutes from "./routes/app-routes.tsx";
import { useSnackbarStore } from "./stores/snackbar.ts";
import theme from "./styles/theme.ts";

const App = () => {
  const { open, message, severity, closeSnackbar } = useSnackbarStore();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SWRConfig
        value={{
          fetcher,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          refreshWhenOffline: false,
          refreshWhenHidden: false,
        }}
      >
        <BrowserRouter>
          <Loader />
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={(event, reason) => {
              if (reason !== "clickaway") {
                closeSnackbar();
              }
            }}
          >
            <Alert severity={severity} onClose={closeSnackbar}>
              {message}
            </Alert>
          </Snackbar>

          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </SWRConfig>
    </ThemeProvider>
  );
};

export default App;
