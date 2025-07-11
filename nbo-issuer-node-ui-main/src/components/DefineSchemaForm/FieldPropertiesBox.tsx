import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  type TextFieldProps,
  Typography,
  styled,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormDataType, SupportedTypeEnum } from "./types";
import { UNIQUE_FIELD_NAME_ERROR } from "./schema";

type Props = {
  className?: string;
  selectedIndex: number | null;
  readOnly?: boolean;
};
const defaultInputProps: TextFieldProps["InputProps"] = { notched: false };

const FieldPropertiesBox = styled(
  ({ className, readOnly, selectedIndex }: Props) => {
    const { t } = useTranslation();
    const { trigger, getValues, control } = useFormContext<FormDataType>();

    const revalidateAllFieldNames = () => {
      const allFields = getValues("fields");
      for (let i = 0; i < allFields.length; i++) {
        trigger(`fields.${i}.fieldName`);
      }
    };

    return (
      <Root className={className}>
        <Typography variant="text20">{t("field_propertiers")}</Typography>
        {selectedIndex === null && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {t("message_select_field_to_edit")}
          </Alert>
        )}
        {selectedIndex !== null && (
          <Stack direction="column" gap={3.5} sx={{ mt: 3.5 }}>
            <Controller
              control={control}
              name={`fields.${selectedIndex}.fieldName`}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    if (error?.type === UNIQUE_FIELD_NAME_ERROR) {
                      revalidateAllFieldNames();
                    }
                  }}
                  label={t("input_field_name")}
                  required
                  error={!!error}
                  helperText={error?.message ?? ""}
                  InputProps={{ ...defaultInputProps, readOnly }}
                />
              )}
            />
            <Controller
              control={control}
              name={`fields.${selectedIndex}.title`}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label={t("field_title_english")}
                  required
                  error={!!error}
                  helperText={error?.message ?? ""}
                  InputProps={{ ...defaultInputProps, readOnly }}
                />
              )}
            />
            <Controller
              control={control}
              name={`fields.${selectedIndex}.titleAr`}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label={t("field_title_arabic")}
                  required
                  error={!!error}
                  helperText={error?.message ?? ""}
                  InputProps={{ ...defaultInputProps, readOnly }}
                />
              )}
            />
            <Controller
              control={control}
              name={`fields.${selectedIndex}.type`}
              render={({ field }) => (
                <TextField
                  select
                  label={t("type")}
                  required
                  {...field}
                  InputProps={{ ...defaultInputProps, readOnly }}
                >
                  {Object.values(SupportedTypeEnum).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              control={control}
              name={`fields.${selectedIndex}.description`}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  multiline
                  rows={2}
                  label={t("description_english")}
                  required
                  error={!!error}
                  helperText={error?.message ?? ""}
                  InputProps={{ ...defaultInputProps, readOnly }}
                />
              )}
            />
            <Controller
              control={control}
              name={`fields.${selectedIndex}.descriptionAr`}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  multiline
                  rows={2}
                  label={t("description_arabic")}
                  required
                  error={!!error}
                  helperText={error?.message ?? ""}
                  InputProps={{ ...defaultInputProps, readOnly }}
                />
              )}
            />
            <Controller
              control={control}
              name={`fields.${selectedIndex}.isRequired`}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      color="default"
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                      }}
                      disabled={readOnly}
                    />
                  }
                  label={
                    <Typography variant="text14" fontWeight={400}>
                      {`${t("input_required")}?`}
                    </Typography>
                  }
                />
              )}
            />
          </Stack>
        )}
      </Root>
    );
  },
)({});

const Root = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  padding: theme.spacing(3.5, 5),
  borderRadius: 12,
}));

export default FieldPropertiesBox;
