import { useTranslation } from "react-i18next";
import {
  Dialog,
  styled,
  type DialogProps,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Grid,
} from "@mui/material";
import { ReactComponent as IconClose } from "@/assets/icons/ic_close.svg";

export type Props = Omit<DialogProps, "onClose"> & {
  onClose?: () => void;
  name: string;
};

const ResetEmailModal = ({ onClose, name, ...dialogProps }: Props) => {
  const { t } = useTranslation();
  const { currentEmail, newEmail, confirmNewEmail } = {
    currentEmail: "tmth@gft.com",
    newEmail: "",
    confirmNewEmail: "",
  };

  return (
    <StyledDialog {...dialogProps} onClose={onClose} maxWidth={false} fullWidth>
      <DialogTitle>
        {t("reset_email_modal_title", {
          name,
        })}
        <IconButton size="small" onClick={onClose} aria-label="close">
          <IconClose />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack gap={2.5}>
          <Grid container direction="row" spacing={2}>
            <Grid
              item
              sx={{
                width: "50%",
              }}
            >
              <TextField
                disabled
                value={currentEmail}
                label={t("current_email_Lbl")}
                sx={{
                  width: "100%",
                }}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid
              item
              sx={{
                width: "50%",
              }}
            >
              <TextField
                required
                value={newEmail}
                label={t("new_email_Lbl")}
                sx={{
                  width: "100%",
                }}
              />
            </Grid>
            <Grid
              item
              sx={{
                width: "50%",
              }}
            >
              <TextField
                required
                value={confirmNewEmail}
                label={t("confirm_new_email_Lbl")}
                sx={{
                  width: "100%",
                }}
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="black"
          sx={{ width: 150 }}
          size="large"
          onClick={onClose}
        >
          {t("button_cancel")}
        </Button>
        <Button color="primary" size="large" sx={{ width: 200 }}>
          {t("button_reset")}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    maxWidth: 800,
  },
}));

export default ResetEmailModal;
