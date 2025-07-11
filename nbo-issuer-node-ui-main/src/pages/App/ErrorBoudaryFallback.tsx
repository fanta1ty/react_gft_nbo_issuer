import { Typography, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};
export const ErrorBoundaryFallback = ({ resetErrorBoundary }: Props) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleBack = () => {
    resetErrorBoundary();
    navigate(0);
  };
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography variant="h4">{t("somethingWentWrong")}</Typography>
      <Button onClick={handleBack}>{t("retry")}</Button>
    </Stack>
  );
};
