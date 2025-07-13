import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { Box, Button, CircularProgress } from "@mui/material";
import { globalSnackbarState } from "@/recoil/atoms";
import { useTranslation } from "react-i18next";

type RevokeCertificateFn = (args: {
  revokeNonce: number;
}) => Promise<void> | void;

type Props = {
  onRevoke: RevokeCertificateFn;
  revokeNonce: number;
};
export const RevokeButton = ({ onRevoke, revokeNonce }: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const setGlobalSnackbar = useSetRecoilState(globalSnackbarState);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onRevoke({ revokeNonce });
    } catch (error) {
      setGlobalSnackbar({
        message: (
          <>
            <p>Failed to revoke certificate:</p>
            {error && <p>{error.toString()}</p>}
          </>
        ),
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ paddingRight: 20 }}>
      <Button
        variant="outlined"
        color="error"
        size="small"
        sx={{ marginRight: 1 }}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress size={20} color="warning" />
        ) : (
          t("button_revokeText")
        )}
      </Button>
    </Box>
  );
};
