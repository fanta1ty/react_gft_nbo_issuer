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
import useDeleteRepresentative from "@/api/useDeleteRepresentative";
import { ProgressOverlay } from "@/components";

export type Props = Omit<DialogProps, "onClose"> & {
  onClose?: () => void;
  name: string;
  userId: string;
};

const DeleteModal = ({ onClose, name, userId, ...dialogProps }: Props) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useDeleteRepresentative({
    onError: () => {},
    onSettled: () => {
      onClose?.();
    },
  });

  return (
    <StyledDialog {...dialogProps} onClose={onClose} maxWidth={false} fullWidth>
      {isLoading && <ProgressOverlay show />}
      <DialogTitle>
        {t("delete_representative_modal_title", {
          name,
        })}
        <IconButton size="small" onClick={onClose} aria-label="close">
          <IconClose />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography>{t("representative_delete_confirmation")}</Typography>
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
          {t("button_delete")}
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

export default DeleteModal;
