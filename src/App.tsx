import { Alert, CssBaseline, Snackbar, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SWRConfig } from "swr";
import { fetcher } from "./api/fetcher";
import Layout from "./components/layout/index.tsx";
import { Loader } from "./components/loader/index.tsx";
import { routes } from "./routes/index.tsx";
import { useSnackbarStore } from "./stores/snackbar.ts";
import { store } from "./stores/store.ts";
import theme from "./styles/theme.ts";

const App = () => {
  const { open, message, severity, closeSnackbar } = useSnackbarStore();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
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
                onClose={(_event, reason) => {
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
                <Routes>
                  {routes.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                  ))}
                </Routes>
              </Layout>
            </BrowserRouter>
          </SWRConfig>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
