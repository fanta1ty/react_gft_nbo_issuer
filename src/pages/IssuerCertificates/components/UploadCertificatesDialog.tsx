import { useTranslation } from "react-i18next";
import {
  Dialog,
  Box,
  CircularProgress,
  styled,
  type DialogProps,
} from "@mui/material";
import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";
import type { InferType } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SuccessView } from "./SuccessView";
import schema from "../schema";
import FormView from "./FormView";
import { globalSnackbarState } from "@/recoil/atoms";
import { useSetRecoilState } from "recoil";
import usePostCertificatesCSV from "@/api/usePostCertificatesCSV";

export type Props = Omit<DialogProps, "onClose"> & {
  onClose?: () => void;
  onUploadSuccess?: () => void;
};

export type FormDataType = {
  userId: string | null;
  certificateId: string;
  startDate: Date | null;
  endDate: Date | null;
  score: number;
};

const UploadCertificatesDialog = ({
  onClose,
  onUploadSuccess,
  ...dialogProps
}: Props) => {
  const { t } = useTranslation();
  const setGlobalSnackbar = useSetRecoilState(globalSnackbarState);
  const formMethods = useForm({
    resolver: yupResolver<InferType<typeof schema>>(schema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = formMethods;

  const { mutate, isSuccess, isLoading, error } = usePostCertificatesCSV({
    onSuccess: () => {
      reset({}, { keepValues: true });
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    },
    onError: (data) => {
      setGlobalSnackbar({
        message: (
          <>
            <p>
              {t("sending_request_error")}: {data.response?.data?.message || ""}
            </p>
          </>
        ),
        severity: "error",
      });
    },
  });
  const errorMessage = error?.response?.data?.message || error?.message;

  const onSubmit: SubmitHandler<InferType<typeof schema>> = (values) => {
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

  return (
    <StyledDialog
      {...dialogProps}
      onClose={dialogOnClose}
      maxWidth={false}
      fullWidth
    >
      <FormProvider {...formMethods}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
                alignItems: "center",
                minHeight: "388px",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {!isSuccess && !isLoading && (
            <FormView errorMessage={errorMessage} onClose={onClose} />
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

export { UploadCertificatesDialog };
