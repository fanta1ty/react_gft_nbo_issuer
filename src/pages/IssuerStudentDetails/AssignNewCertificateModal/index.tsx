import {
  CircularProgress,
  Dialog,
  type DialogProps,
  styled,
} from "@mui/material";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import useAssignCertificateNew from "@/api/useAssignCertificateNew";
import { StudentType } from "@/api/useGetStudents";
import SuccessView from "@/components/AssignCertificatesDialog/SuccessView";

import FormView from "./FormView";
import { useTranslation } from "react-i18next";
import { CertificateSectionFormDataType } from "@/components/CertificateSection";
import useProgressOverlay from "@/utils/useProgressOverlay";
import getErrorMessage from "@/utils/getErrorMessage";

type Props = {
  studentDetails: StudentType;
  onClose?: () => void;
  onAssignSuccess: () => void;
};

export type FormDataType = CertificateSectionFormDataType & {
  hasAchievedCertificate: boolean;
};

const AssignNewCertificateModal = ({
  onAssignSuccess,
  studentDetails,
  onClose,
  ...dialogProps
}: Props) => {
  const progressOverlay = useProgressOverlay();

  const formMethods = useForm<FormDataType>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      certificateId: "",
    },
  });
  const {
    reset,
    handleSubmit,
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

  const { t } = useTranslation();
  const onSubmit: SubmitHandler<FormDataType> = async (values) => {
    mutate(
      {
        ...values,
        nationalId: studentDetails.nationalId,
        firstName: studentDetails.firstName,
        lastName: studentDetails.lastName,
      },
      {
        onSuccess: () => {
          if (onAssignSuccess) {
            onAssignSuccess();
          }
        },
      },
    );
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
    if (isDirty && !isSuccess) {
      // TODO: create MUI confirm dialog
      canClose = window.confirm(t("warning_confirmDiscardChanges"));
    }
    if (canClose && onClose) {
      onClose();
    }
  };
  return isLoading ? (
    <CircularProgress size={20} />
  ) : (
    <StyledDialog
      maxWidth={false}
      fullWidth
      open={true}
      onClose={dialogOnClose}
      {...dialogProps}
    >
      <FormProvider {...formMethods}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {!isSuccess && !isLoading && (
            <FormView
              studentDetails={studentDetails}
              errorMessage={error ? getErrorMessage(error) : ""}
              onClose={onClose}
            />
          )}
          {isSuccess && <SuccessView onClose={handleClose} />}
        </form>
      </FormProvider>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    maxWidth: 800,
  },
}));

export default AssignNewCertificateModal;
