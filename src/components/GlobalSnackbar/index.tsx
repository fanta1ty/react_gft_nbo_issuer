import { useRecoilValue, useResetRecoilState } from "recoil";
import { Alert, Snackbar } from "@mui/material";
import { globalSnackbarState } from "@/recoil/atoms";

const GlobalSnackbar = () => {
  const globalSnackbar = useRecoilValue(globalSnackbarState);
  const resetGlobalSnackbar = useResetRecoilState(globalSnackbarState);

  return (
    <Snackbar
      open={Boolean(globalSnackbar.message)}
      autoHideDuration={6000}
      onClose={() => resetGlobalSnackbar()}
    >
      <Alert
        severity={globalSnackbar.severity}
        sx={{ width: "100%", display: "flex", alignItems: "center" }}
      >
        {globalSnackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
