import {
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Alert,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { ReactComponent as IconClose } from "@/assets/icons/ic_close.svg";
import StudentsTextField from "./StudentsTextField";
import DatePickerFormControl from "../DatePickerFormControl";
import { FC } from "react";
import {
  FormDataType,
  Props as AssignCertificatesDialogProps,
} from "./AssignCertificatesDialog";
import { useTranslation } from "react-i18next";

type Props = Pick<AssignCertificatesDialogProps, "onClose" | "certificate"> & {
  errorMessage?: string;
};

const FormView: FC<Props> = ({ errorMessage, onClose, certificate }) => {
  const {
    control,
    trigger,
    getValues,
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

  const handleDateValidation = () => {
    trigger("startDate");
    trigger("endDate");
  };

  return (
    <>
      <DialogTitle>
        {t("assign_new_certificate_Lbl")}
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
              name="userId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <StudentsTextField
                  label={t("student_Lbl")}
                  value={value}
                  onChange={onChange}
                  required
                  error={!!errors.userId}
                  helperText={errors.userId?.message}
                  certificateId={certificate.id}
                />
              )}
            />
          </Grid>
          {certificate && (
            <Grid item xs={12}>
              <TextField
                disabled
                label={t("certificate_Lbl")}
                value={certificate.title}
                fullWidth
                inputProps={{
                  sx: { textTransform: "capitalize" },
                }}
              />
            </Grid>
          )}
          <Grid item xs={6}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePickerFormControl
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    if (getValues("endDate")) {
                      handleDateValidation();
                    }
                  }}
                  label={t("course_start_date_Lbl")}
                  disableFuture
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      error: !!errors.startDate,
                      helperText: errors.startDate?.message,
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DatePickerFormControl
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    if (getValues("startDate")) {
                      handleDateValidation();
                    }
                  }}
                  label={t("course_end_date_Lbl")}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      error: !!errors.endDate,
                      helperText: errors.endDate?.message,
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="score"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t("th_studentScore")}
                  type="number"
                  inputProps={{ min: 0, max: 100 }}
                  fullWidth
                  required
                  error={!!errors.score}
                  helperText={errors.score?.message}
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
          {t("button_assignText")}
        </Button>
      </DialogActions>
    </>
  );
};

export default FormView;
