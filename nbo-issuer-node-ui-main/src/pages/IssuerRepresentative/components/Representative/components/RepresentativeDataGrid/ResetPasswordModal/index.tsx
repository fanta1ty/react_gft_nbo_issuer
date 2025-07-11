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
  Typography,
} from "@mui/material";
import { ReactComponent as IconClose } from "@/assets/icons/ic_close.svg";
import usePostRepresentativeResetPassword from "@/api/usePostRepresentativeResetPassword";
import { ProgressOverlay } from "@/components";

export type Props = Omit<DialogProps, "onClose"> & {
  onClose?: () => void;
  name: string;
  userId: string;
};

const ResetPasswordModal = ({
  onClose,
  name,
  userId,
  ...dialogProps
}: Props) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = usePostRepresentativeResetPassword({
    onSettled: () => {
      onClose?.();
    },
  });

  return (
    <StyledDialog {...dialogProps} onClose={onClose} maxWidth={false} fullWidth>
      {isLoading && <ProgressOverlay show />}
      <DialogTitle>
        {t("reset_password_modal_title", {
          name,
        })}
        <IconButton size="small" onClick={onClose} aria-label="close">
          <IconClose />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography>
          {t("representative_reset_password_confirmation")}
        </Typography>
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
        <Button
          color="error"
          size="large"
          sx={{ width: 200 }}
          onClick={() => {
            mutate({
              userId,
            });
          }}
        >
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

export default ResetPasswordModal;
