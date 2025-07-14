import { Outlet } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ModalProvider from "mui-modal-provider";
import { AuthProvider } from "@/router/Auth";
import { CasbinProvider } from "@/contexts/CasbinContext";
import useThemeWithLocale from "@/theme/theme";
import { GlobalProgressOverlay, GlobalSnackbar } from "@/components";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryFallback } from "./ErrorBoudaryFallback";
import "@/i18n";

const App = () => {
  const theme = useThemeWithLocale();

  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <AuthProvider>
        <CasbinProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <GlobalProgressOverlay />
              <ModalProvider>
                <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                  <Outlet />
                </ErrorBoundary>
                <GlobalSnackbar />
              </ModalProvider>
            </ThemeProvider>
          </LocalizationProvider>
        </CasbinProvider>
      </AuthProvider>
    </QueryParamProvider>
  );
};

export default App;
