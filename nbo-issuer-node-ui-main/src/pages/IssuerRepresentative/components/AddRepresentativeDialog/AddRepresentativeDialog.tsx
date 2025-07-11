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
import SuccessView from "./AddRepresentativeDialogSuccessView";
import AddRepresentativeDialogSchema from "./AddRepresentativeDialogSchema";
import { globalSnackbarState } from "@/recoil/atoms";
import { useSetRecoilState } from "recoil";
import useInviteNewRepresentative from "@/api/useInviteNewRepresentative";
import AddRepresentativeDialogFormView from "./AddRepresentativeDialogFormView";

export type Props = Omit<DialogProps, "onClose"> & {
  onClose?: () => void;
  onInviteSuccess?: () => void;
};

export type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  superAdmin: boolean;
};

const AddRepresentativeDialog = ({
  onClose,
  onInviteSuccess,
  ...dialogProps
}: Props) => {
  const { t } = useTranslation();

  const setGlobalSnackbar = useSetRecoilState(globalSnackbarState);

  const formMethods = useForm<FormDataType>({
    resolver: yupResolver<FormDataType>(AddRepresentativeDialogSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      superAdmin: false,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = formMethods;

  const { mutate, isSuccess, isLoading, error } = useInviteNewRepresentative({
    onSuccess: () => {
      reset({}, { keepValues: true });
      if (onInviteSuccess) {
        onInviteSuccess();
      }
    },
    onError: (data) => {
      setGlobalSnackbar({
        message: (
          <>
            <p>
              {t("sendingRequestError")}
              {data.response?.data?.message || ""}
            </p>
          </>
        ),
        severity: "error",
      });
    },
  });
  const errorMessage = error?.response?.data?.message || error?.message;

  const onSubmit: SubmitHandler<FormDataType> = (values) => {
    // console.log(values);
    mutate(values as InferType<typeof AddRepresentativeDialogSchema>);
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
            <AddRepresentativeDialogFormView
              errorMessage={errorMessage}
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

export default AddRepresentativeDialog;
