import { useTranslation } from "react-i18next";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { schema } from "./shema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Dialog,
  styled,
  type DialogProps,
} from "@mui/material";
import { ReactComponent as IconClose } from "@/assets/icons/ic_close.svg";
import useRegisterTemplate from "@/api/useRegisterTemplate";
import { useSetRecoilState } from "recoil";
import { globalSnackbarState } from "@/recoil/atoms";
import { queryClient } from "@/reactQuery/queryClient";

export type FormDataType = {
  templateName: string;
  description: string;
};

export type Props = Omit<DialogProps, "onClose"> & {
  onClose?: () => void;
};

const NewTemplateDialog = ({ onClose, ...dialogProps }: Props) => {
  const { t } = useTranslation();
  const setGlobalSnackbar = useSetRecoilState(globalSnackbarState);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(schema),
    defaultValues: {
      templateName: "",
      description: "",
    },
  });
  const { mutate, isLoading } = useRegisterTemplate({
    onSuccess: () => {
      setGlobalSnackbar({
        message: "Create Template Success",
        severity: "success",
      });
      onClose?.();
      reset({}, { keepValues: true });
      queryClient.invalidateQueries(["register-schema"]);
    },
    onError: (data) => {
      setGlobalSnackbar({
        message: (
          <p>
            {data?.response?.data.message ||
              "There was an error when Create new template"}
          </p>
        ),
        severity: "error",
      });
    },
  });
  const onSubmit: SubmitHandler<FormDataType> = (values: FormDataType) => {
    mutate(values);
  };

  const dialogOnClose: DialogProps["onClose"] = (_, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
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
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {t("create_new_template")}
          <IconButton
            size="small"
            onClick={handleClose}
            aria-label="close"
            sx={{ right: 0, top: 0 }}
          >
            <IconClose />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <Controller
            name="templateName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("template_name")}
                required
                sx={{ mb: 2.5, width: "100%" }}
                error={!!errors.templateName}
                helperText={errors.templateName?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ mb: 2.5, width: "100%" }}
                label={t("description")}
                required
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="black"
            sx={{ width: 180 }}
            onClick={handleClose}
            size="large"
          >
            {t("button_cancel")}
          </Button>
          <Button
            color="primary"
            sx={{ width: 180 }}
            type="submit"
            size="large"
            disabled={isLoading}
          >
            {t("save_as_draft")}
          </Button>
        </DialogActions>
      </form>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    maxWidth: 800,
  },
}));

export default NewTemplateDialog;
