import {
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
  MenuItem,
} from "@mui/material";
import {
  FormProvider,
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppRoutes } from "@/router/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import usePostCertificates from "@/api/usePostCertificates";
import type { ValuesType } from "@/api/usePostCertificates";
import schema from "./schema";
import { globalSnackbarState } from "@/recoil/atoms";
import { useSetRecoilState } from "recoil";
import useProgressOverlay from "@/utils/useProgressOverlay";
import useGetSchemas from "@/api/useGetSchemas";

const CreateNewCertificate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setGlobalSnackbar = useSetRecoilState(globalSnackbarState);
  const progressOverlay = useProgressOverlay();
  const formMethods = useForm<ValuesType>({
    resolver: yupResolver(schema),
    defaultValues: {
      certificateName: "",
      cid: "",
      certificateDescription: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = formMethods;

  const { data: schemasData } = useGetSchemas();

  const { mutate, error } = usePostCertificates({
    onSuccess() {
      reset({}, { keepValues: true });
      navigate(AppRoutes.CREATE_NEW_CERTIFICATE_CONFIRM);
    },
    onMutate: () => {
      progressOverlay.show();
    },
    onSettled: () => {
      progressOverlay.hide();
    },
    onError: (data) => {
      setGlobalSnackbar({
        message: (
          <>
            <p>
              {t("requestErrorMessage")} {data.response?.data?.message || ""}
            </p>
          </>
        ),
        severity: "error",
      });
    },
  });

  const onSubmit: SubmitHandler<ValuesType> = (values) => {
    const schema = schemasData?.find(
      (schema) => schema.jsonSchemaCid === values.cid,
    );
    const newValues = {
      ...values,
      schemaType: schema?.schemaType,
    };
    mutate(newValues);
  };

  return (
    <FormProvider {...formMethods}>
      <Stack
        direction="column"
        width={608}
        sx={{ mx: "auto" }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Typography
          variant="h3"
          fontWeight={600}
          textAlign="center"
          sx={{ mb: 7.5 }}
        >
          {t("createCertificate_createHeading")}
        </Typography>
        {error?.response?.data.message && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error.response.data.message}
          </Alert>
        )}
        <Controller
          name="certificateName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("input_certificateNameLabel")}
              required
              sx={{ mb: 2.5 }}
              inputProps={{ maxLength: 50 }}
              error={!!errors.certificateName}
              helperText={errors.certificateName?.message}
            />
          )}
        />
        <Controller
          name={"cid"}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label={t("input_certificateTypeLabel")}
              fullWidth
              required
              sx={{ mb: 2.5 }}
              value={field.value ?? ""}
              error={!!errors.cid}
              helperText={errors.cid?.message}
            >
              {(schemasData ?? [])?.map((schema) => {
                return (
                  <MenuItem
                    key={schema.jsonSchemaCid}
                    value={schema.jsonSchemaCid}
                  >
                    <Typography
                      variant="text14"
                      fontWeight={600}
                      className="option-text"
                    >
                      {schema.schemaType}
                    </Typography>
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        />
        <Controller
          name="certificateDescription"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ mb: 6 }}
              label={t("input_certificateDescriptionLabel")}
              required
              multiline
              rows={4}
              inputProps={{ maxLength: 300 }}
              error={!!errors.certificateDescription}
              helperText={errors.certificateDescription?.message}
            />
          )}
        />
        <Button
          color="primary"
          size="large"
          type="submit"
          fullWidth
          sx={{ maxWidth: 400, alignSelf: "center" }}
        >
          {t("button_certificateCreateText")}
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default CreateNewCertificate;
