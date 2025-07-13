import {
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Alert,
  Radio,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { ReactComponent as IconClose } from "@/assets/icons/ic_close.svg";
import { FC } from "react";
import {
  FormDataType,
  Props as AddRepresentativeDialogProps,
} from "./AddRepresentativeDialog";
import { useTranslation } from "react-i18next";
import { OptionBox, StyledFormControlLabel, StyledRadioGroup } from "./styles";

type Props = Pick<AddRepresentativeDialogProps, "onClose"> & {
  errorMessage?: string;
};

const AddRepresentativeDialogFormView: FC<Props> = ({
  errorMessage,
  onClose,
}) => {
  const {
    control,
    setValue,
    formState: { isDirty, isSubmitting, errors },
  } = useFormContext<FormDataType>();

  const { t } = useTranslation();

  const handleClose = () => {
    let canClose = true;
    if (isDirty) {
      // TODO: create MUI confirm dialog
      canClose = window.confirm(t("warning_confirmDiscardChanges"));
    }
    if (canClose) {
      onClose?.();
    }
  };

  return (
    <>
      <DialogTitle>
        {t("onboarding_invitation_title")}
        <IconButton size="small" onClick={handleClose} aria-label="close">
          <IconClose />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 1 }}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <Controller
              name="superAdmin"
              control={control}
              render={({ field: radioGroupField }) => (
                <StyledRadioGroup {...radioGroupField}>
                  <OptionBox onClick={() => setValue("superAdmin", true)}>
                    <StyledFormControlLabel
                      disableTypography
                      value={true}
                      control={<Radio />}
                      label={t("input_radio_super_representative_lbl")}
                    />
                  </OptionBox>
                  <OptionBox onClick={() => setValue("superAdmin", false)}>
                    <StyledFormControlLabel
                      disableTypography
                      value={false}
                      control={<Radio />}
                      label={t("input_radio_representative_lbl")}
                    />
                  </OptionBox>
                </StyledRadioGroup>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("input_firstNameLabel")}
                  type="text"
                  inputProps={{ min: 0, max: 100 }}
                  fullWidth
                  required
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("input_lastNameLabel")}
                  type="text"
                  inputProps={{ min: 0, max: 100 }}
                  fullWidth
                  required
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("input_emailLabel")}
                  type="text"
                  inputProps={{ min: 0, max: 100 }}
                  fullWidth
                  required
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="black"
          sx={{ width: 180 }}
          onClick={handleClose}
          size="large"
          disabled={isSubmitting}
        >
          {t("button_cancel")}
        </Button>
        <Button
          color="primary"
          sx={{ width: 180 }}
          type="submit"
          size="large"
          disabled={isSubmitting}
        >
          {t("onboarding_invitation_send_button_lbl")}
        </Button>
      </DialogActions>
    </>
  );
};

export default AddRepresentativeDialogFormView;
