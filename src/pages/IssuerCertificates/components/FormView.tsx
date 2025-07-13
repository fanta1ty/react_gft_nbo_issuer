import {
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { ReactComponent as IconClose } from "@/assets/icons/ic_close.svg";
import CertificateThumbnail from "@/assets/icons/certificate-thumbnail.svg";
import { FC } from "react";
import { type InferType } from "yup";
import schema from "../schema";
import { InputFileUploaderFormControl } from "@/components/InputFileUploaderControl";
import { useTranslation } from "react-i18next";

type Props = {
  errorMessage?: string;
  onClose?: () => void;
};

const FormView: FC<Props> = ({ errorMessage, onClose }) => {
  const {
    control,
    formState: { isDirty, isSubmitting },
  } = useFormContext<InferType<typeof schema>>();
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
        {t("issuer_certificates_create_dialog_title")}
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
              name="file"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFileUploaderFormControl
                  label={t("upload_csv_Lbl")}
                  value={value}
                  onChange={onChange}
                  FileInputProps={{
                    fileTypeLimitText: t("upload_csv_error"),
                    fileTypeAccept: {
                      "application/text": [".csv"],
                    },
                    fileThumbnail: (
                      <img
                        width={100}
                        height={128}
                        src={CertificateThumbnail}
                      />
                    ),
                  }}
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
          {t("button_certificateCreateText")}
        </Button>
      </DialogActions>
    </>
  );
};

export default FormView;
