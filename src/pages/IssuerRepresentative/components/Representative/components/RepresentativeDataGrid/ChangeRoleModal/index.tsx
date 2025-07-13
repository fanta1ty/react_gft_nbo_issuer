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
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import { ReactComponent as IconClose } from "@/assets/icons/ic_close.svg";

export type Props = Omit<DialogProps, "onClose"> & {
  onClose?: () => void;
  name: string;
};

const ChangeRoleModal = ({ onClose, name, ...dialogProps }: Props) => {
  const { t } = useTranslation();

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
        <FormControl>
          <FormLabel
            required
            id="role-group-label"
            sx={{
              fontWeight: 600,
              mb: 1,
            }}
          >
            {t("role")}
          </FormLabel>
          <RadioGroup
            aria-labelledby="role-group-label"
            defaultValue="female"
            name="role"
            sx={{
              flexDirection: "row",
              ml: 2,
              gap: 1,
            }}
          >
            <FormControlLabel
              value="super-representative"
              control={<Radio checked />}
              label={t("super_representative")}
              sx={{
                border: 2,
                borderColor: "custom.dark.6",
                padding: 2,
                borderRadius: 3,
              }}
            />
            <FormControlLabel
              value="representative"
              control={<Radio />}
              label={t("representative")}
              sx={{
                border: 2,
                borderColor: "custom.dark.6",
                padding: 2,
                borderRadius: 3,
              }}
            />
          </RadioGroup>
        </FormControl>
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
          {t("button_change")}
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

export default ChangeRoleModal;
