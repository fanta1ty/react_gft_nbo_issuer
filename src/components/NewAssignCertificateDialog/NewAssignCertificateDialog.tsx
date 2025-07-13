import { useTranslation } from "react-i18next";
import {
  Dialog,
  CircularProgress,
  styled,
  type DialogProps,
  Stack,
} from "@mui/material";
import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";
import useAssignCertificateNew from "@/api/useAssignCertificateNew";
import FormView from "./components/FormView";
import SuccessView from "../AssignCertificatesDialog/SuccessView";
import { type FormDataType } from "./helpers/validations";
import useProgressOverlay from "@/utils/useProgressOverlay";
import { CertificateType } from "@/api/useGetCertificates";
import getErrorMessage from "@/utils/getErrorMessage";

export type Props = Omit<DialogProps, "onClose"> & {
  certificate?: Pick<CertificateType, "id" | "title">;
  onClose?: () => void;
  onAssignSuccess?: () => void;
};

const NewAssignCertificateDialog = ({
  certificate,
  onClose,
  onAssignSuccess,
  ...dialogProps
}: Props) => {
  const progressOverlay = useProgressOverlay();
  const { t } = useTranslation();
  const formMethods = useForm<FormDataType>({
    defaultValues: {
      nationalId: "",
      firstName: "",
      lastName: "",
      certificateId: certificate?.id || "",
      credentialSubject: {},
      hasLoadCertificateSchema: false,
      hasAchievedCertificate: false,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = formMethods;

  const { mutate, isSuccess, isLoading, error } = useAssignCertificateNew({
    onMutate: () => {
      progressOverlay.show();
    },
    onSettled: () => {
      progressOverlay.hide();
    },
    onSuccess: () => {
      reset({}, { keepValues: true });
      if (onAssignSuccess) {
        onAssignSuccess();
      }
    },
  });

  const onSubmit: SubmitHandler<FormDataType> = (values) => {
    mutate(values);
  };

  const dialogOnClose: DialogProps["onClose"] = (_, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      // prevent dialog from closing when user click backdrop or press escape
      return;
    }
    handleClose();
  };

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

  return isLoading ? (
    <CircularProgress size={20} />
  ) : (
    <StyledDialog
      {...dialogProps}
      onClose={dialogOnClose}
      maxWidth={false}
      fullWidth
    >
      <FormProvider {...formMethods}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {!isSuccess && !isLoading && (
            <FormView
              onClose={handleClose}
              certificateId={certificate?.id}
              errorMessage={error ? getErrorMessage(error) : ""}
            />
          )}
          {isSuccess && <SuccessView onClose={handleClose} />}
        </form>
      </FormProvider>
      {isLoading && (
        <Stack
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: `rgba(255, 255, 255, 0.7)`,
            zIndex: 1,
          }}
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size={20} />
        </Stack>
      )}
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    maxWidth: 800,
  },
}));

export default NewAssignCertificateDialog;
