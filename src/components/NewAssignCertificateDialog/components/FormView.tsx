import {
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { ReactComponent as IconClose } from "@/assets/icons/ic_close.svg";
import { useTranslation } from "react-i18next";
import type { FormDataType } from "../helpers/validations";
import CertificateSection from "@/components/CertificateSection";
import CandidateSection from "./CandidateSection";
import { useState } from "react";

type FormViewProps = {
  errorMessage?: string;
  onClose: () => void;
  certificateId?: string;
};

const FormView = ({ onClose, errorMessage, certificateId }: FormViewProps) => {
  const {
    formState: { isSubmitting },
  } = useFormContext<FormDataType>();
  const { t } = useTranslation();
  const [listStudentCertificateIds, setListStudentCertificateIds] = useState<
    string[]
  >([]);
  return (
    <>
      <DialogTitle>
        {t("assign_new_certificate_Lbl")}
        <IconButton size="small" onClick={onClose} aria-label="close">
          <IconClose />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: 1 }}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}
        <CandidateSection
          setListStudentCertificateIds={setListStudentCertificateIds}
        />
        <CertificateSection
          listStudentCertificateIds={listStudentCertificateIds}
          certificateId={certificateId}
          sx={{ mt: 0 }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="black"
          sx={{ width: 180 }}
          onClick={onClose}
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
