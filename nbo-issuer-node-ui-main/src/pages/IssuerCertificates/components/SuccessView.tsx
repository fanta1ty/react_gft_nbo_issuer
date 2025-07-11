import { Typography, Button, Stack, styled } from "@mui/material";
import { ReactComponent as IconCheck } from "@/assets/icons/ic_check.svg";
import { useTranslation } from "react-i18next";

type Props = {
  onClose: () => void;
  className?: string;
};

const SuccessView = ({ onClose, className }: Props) => {
  const { t } = useTranslation();
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ p: 4, backgroundColor: "common.white" }}
      className={className}
    >
      <SuccessCheck sx={{ mb: 3.5 }} />
      <Typography
        variant="text24"
        fontWeight={600}
        color="custom.dark.10"
        sx={{ mb: 2 }}
      >
        {t("new_certificate_uploaded_Lbl")}
      </Typography>
      <Typography
        variant="text14"
        fontWeight={400}
        color="custom.dark.6"
        sx={{ maxWidth: 600, mb: 5, textAlign: "center" }}
      >
        {t("new_certificate_uploaded_description")}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onClose}
        sx={{ width: 150 }}
      >
        {t("button_doneText")}
      </Button>
    </Stack>
  );
};

const SuccessCheck = styled(({ className }: { className?: string }) => (
  <Stack alignItems="center" justifyContent="center" className={className}>
    <IconCheck width={60} height={60} />
  </Stack>
))(({ theme }) => ({
  width: 92,
  height: 92,
  borderRadius: "50%",
  border: `1px solid ${theme.palette.custom.positive[6]}`,
  backgroundColor: theme.palette.custom.positive[1],
  color: theme.palette.custom.positive[6],
}));

export { SuccessView };
