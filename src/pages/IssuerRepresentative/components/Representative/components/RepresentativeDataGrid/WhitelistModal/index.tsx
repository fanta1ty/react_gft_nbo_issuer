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
  Typography,
} from "@mui/material";
import { ReactComponent as IconClose } from "@/assets/icons/ic_close.svg";
import usePostWhitelist from "@/api/usePostWhitelist";
import { ProgressOverlay } from "@/components";

export type Props = Omit<DialogProps, "onClose"> & {
  onClose?: () => void;
  name: string;
  userId: string;
};

const WhitelistModal = ({ onClose, name, userId, ...dialogProps }: Props) => {
  const { t } = useTranslation();

  const { mutate, isLoading } = usePostWhitelist({
    onError: () => {},
    onSettled: () => {
      onClose?.();
    },
  });

  return (
    <StyledDialog {...dialogProps} onClose={onClose} maxWidth={false} fullWidth>
      {isLoading && <ProgressOverlay show />}
      <DialogTitle>
        {t("whitelist_modal_title", {
          name,
        })}
        <IconButton size="small" onClick={onClose} aria-label="close">
          <IconClose />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack gap={2.5}>
          <Typography>{t("help_to_improve_the_application")}</Typography>
          <TextField
            label={t("reason_for_decision")}
            multiline
            inputProps={{
              style: {
                height: 88,
              },
            }}
            required
          />
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
        <Button
          color="primary"
          size="large"
          sx={{ width: 200 }}
          onClick={() => {
            mutate({
              userId,
            });
          }}
        >
          {t("reset")}
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

export default WhitelistModal;
