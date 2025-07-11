import { FC, useEffect, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  IconButton,
  DialogTitle,
  DialogContent,
  Grid,
  Alert,
  Typography,
  Box,
  DialogActions,
  Button,
  FormHelperText,
} from "@mui/material";
import { ReactComponent as IconClose } from "@/assets/icons/ic_close.svg";
import { StudentType } from "@/api/useGetStudents";
import { FormDataType } from ".";
import { useTranslation } from "react-i18next";
import CertificateSection from "@/components/CertificateSection";
import Avatar from "@/components/Avatar";

type Props = {
  errorMessage?: string;
  studentDetails: StudentType;
  onClose?: () => void;
};

const FormView: FC<Props> = ({ errorMessage, onClose, studentDetails }) => {
  const {
    control,
    watch,
    setValue,
    trigger,
    formState: { isSubmitting, isDirty, errors },
  } = useFormContext<FormDataType>();
  const { t } = useTranslation();

  const certificateId = watch("certificateId");
  useEffect(() => {
    let hasAchieved = false;
    if (studentDetails && certificateId) {
      if (certificateId === "82f0b12c-adea-4af7-a6e3-b1a5b61b97f0") {
        hasAchieved = true;
      } else {
        hasAchieved = studentDetails.certificates?.some(
          ({ id }) => id === certificateId,
        );
      }
    }
    setValue("hasAchievedCertificate", hasAchieved);
    trigger("hasAchievedCertificate");
  }, [certificateId, studentDetails, setValue, trigger]);

  const handleClose = () => {
    let canClose = true;
    if (isDirty) {
      canClose = window.confirm(t("warning_confirmDiscardChanges"));
    }
    if (canClose) {
      onClose?.();
    }
  };
  const listStudentCertificateIds: string[] = useMemo(() => {
    return (
      studentDetails?.certificates?.map((certificate) => certificate.id) || []
    );
  }, [studentDetails]);
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
        <Grid item xs={5} mb={2}>
          <Box display="flex" gap={2}>
            <Avatar
              avatar={studentDetails.avatar}
              firstName={studentDetails.firstName}
              lastName={studentDetails.lastName}
              size={80}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="text20" fontWeight={600}>
                {studentDetails.firstName} {studentDetails.lastName}
              </Typography>
            </Box>
          </Box>
        </Grid>
        {errors.hasAchievedCertificate && (
          <FormHelperText error sx={{ mb: 2 }}>
            {t("message_user_already_achieved_certificate")}
          </FormHelperText>
        )}
        <CertificateSection
          listStudentCertificateIds={listStudentCertificateIds}
        />
        <Controller
          control={control}
          name="hasAchievedCertificate"
          rules={{ validate: (value) => value === false }}
          render={() => <input hidden />}
        />
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
