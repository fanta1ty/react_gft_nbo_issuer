import { Box, Button, Stack } from "@mui/material";
import FieldsBox from "./FieldsBox";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormDataType } from "./types";
import FieldPropertiesBox from "./FieldPropertiesBox";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./schema";
import { SelectedIndexProvider, useSelectedIndexContext } from "./context";
import useUpdateSchemaTemplate from "@/api/useUpdateSchemaTemplate";
import useProgressOverlay from "@/utils/useProgressOverlay";
import useSnackbar from "@/utils/useSnackbar";
import getErrorMessage from "@/utils/getErrorMessage";
import { createDefaultValues, formValuesToSchemaFields } from "./helpers";
import { SchemaType } from "@/@types";

export type DefineSchemaFormProps = {
  schema: SchemaType;
  onSuccess: () => void;
  onCancel: () => void;
  readOnly?: boolean;
};

const DefineSchemaFormBase = ({
  schema,
  onSuccess,
  onCancel,
  readOnly,
}: DefineSchemaFormProps) => {
  const snackbar = useSnackbar();
  const { show: showLoader, hide: hideLoader } = useProgressOverlay();
  const { t } = useTranslation();
  const { selectedIndex } = useSelectedIndexContext();
  const { mutate } = useUpdateSchemaTemplate({
    onMutate: () => {
      showLoader();
    },
    onSuccess: () => {
      snackbar.show(t("message_define_schema_success"));
      onSuccess();
    },
    onError: (error) => {
      snackbar.show(getErrorMessage(error, t("message_something_went_wrong")), {
        severity: "error",
      });
    },
    onSettled: () => {
      hideLoader();
    },
  });

  const formMethods = useForm<FormDataType>({
    resolver: yupResolver(validationSchema),
    defaultValues: createDefaultValues(schema),
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = formMethods;

  const onSubmit: SubmitHandler<FormDataType> = (values) => {
    const valuesToSubmit = {
      schemaId: schema.schemaId,
      schemaFields: formValuesToSchemaFields(values),
    };
    mutate(valuesToSubmit);
  };

  const handleCancel = () => {
    let canCancel = true;
    if (isDirty) {
      canCancel = window.confirm(t("warning_confirmDiscardChanges"));
    }
    if (canCancel) {
      onCancel();
    }
  };

  return (
    <FormProvider {...formMethods}>
      <Stack
        gap={2}
        direction="row"
        alignItems="flex-start"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <FieldsBox readOnly={readOnly} sx={{ width: 500 }} />
        <Box sx={{ flex: 1 }}>
          <FieldPropertiesBox
            readOnly={readOnly}
            key={selectedIndex} // specify a key to force reset the component's state when selectedIndex changes
            selectedIndex={selectedIndex}
          />
          {!readOnly && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mt: 2.5 }}
            >
              <Button color="black" variant="outlined" onClick={handleCancel}>
                {t("button_cancel")}
              </Button>
              <Button
                type="submit"
                color="primary"
                sx={{ minWidth: 150 }}
                disabled={!isDirty}
              >
                {t("button_save")}
              </Button>
            </Stack>
          )}
        </Box>
      </Stack>
    </FormProvider>
  );
};

const DefineSchemaForm = (props: DefineSchemaFormProps) => {
  return (
    <SelectedIndexProvider>
      <DefineSchemaFormBase {...props} />
    </SelectedIndexProvider>
  );
};

export default DefineSchemaForm;
