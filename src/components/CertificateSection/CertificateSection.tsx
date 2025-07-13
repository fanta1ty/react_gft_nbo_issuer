import {
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import CertificatesTextField from "./CertificatesTextField";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { CertificateSchemaType } from "@/types";
import useLoadSchemaContext, {
  FieldType,
  filterUnnecessaryProperties,
} from "@/api/useLoadSchemaContext";
import DatePickerFormControl from "@/components/DatePickerFormControl";
import { validateStaticField, validateDynamicField } from "./validations";
import type { CertificateSectionFormDataType } from "./types";
import {
  getFieldDefaultValue,
  getSortedDynamicFields,
  getTextFieldLabel,
  getTextFieldType,
} from "./helpers";
import useGetCertificateSchemasById from "@/api/useGetCertificateSchemasById";
import DateTimePickerFormControl from "@/components/DateTimePickerFormControl";
import { format, isValid, formatISO } from "date-fns";
import { API_DATE_PARAM_FORMAT, MILISECONDS_IN_A_DAY } from "@/constants";
import useGetSchemaTranslation from "@/api/useGetSchemaTranslation";
import { SupportedLocales } from "@/recoil/atoms";

type Props = {
  className?: string;
  certificateId?: string;
  listStudentCertificateIds?: string[];
};
const BaseCertificateSection = ({
  className,
  certificateId,
  listStudentCertificateIds,
}: Props) => {
  const [selectedSchema, setSelectedSchema] =
    useState<CertificateSchemaType | null>(null);
  const { t, i18n } = useTranslation();
  const { data: certificateSchema } = useGetCertificateSchemasById(
    {
      id: certificateId || "",
    },
    {
      enabled: !!certificateId,
    },
  );
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<CertificateSectionFormDataType>();
  const { data: schemaTranslation } = useGetSchemaTranslation({
    language: i18n.language === SupportedLocales.AR_SA ? "ar" : "en",
  });

  const {
    data: schemaContext,
    error: loadSchemaError,
    isLoading: isLoadingSchema,
    fetchStatus,
  } = useLoadSchemaContext(selectedSchema?.url, {
    onSuccess: () => {
      setValue("hasLoadCertificateSchema", true);
    },
  });

  const credentialSubject = useMemo(() => {
    if (schemaContext) {
      return filterUnnecessaryProperties(
        schemaContext.properties.credentialSubject,
      );
    }
    return undefined;
  }, [schemaContext]);
  const loadSchemaErrorMessage = loadSchemaError
    ? t("message_failed_to_load_certificate_schema")
    : "";

  const checkIsRequired = (fieldName: string) => {
    if (credentialSubject) {
      const requiredFields = credentialSubject.required;
      return requiredFields.includes(fieldName);
    }
    return false;
  };
  useEffect(() => {
    if (certificateId) {
      if (certificateSchema) {
        setSelectedSchema(certificateSchema);
        setValue("hasLoadCertificateSchema", false);
      }
    }
  }, [certificateId, setValue, certificateSchema]);

  const fields = useMemo(() => {
    if (credentialSubject && credentialSubject.properties) {
      return getSortedDynamicFields(credentialSubject.properties);
    }
    return [];
  }, [credentialSubject]);

  const getLabel = (name: string, field: FieldType) => {
    if (schemaTranslation) {
      return (
        schemaTranslation[field.title] || getTextFieldLabel(name, field, t)
      );
    }
    return "";
  };

  const convertDateToUTCString = (date: Date | string) => {
    const dateObj = new Date(date);
    return formatISO(dateObj, { representation: "complete" });
  };

  return (
    <Grid container spacing={2.5} className={className}>
      <Grid item xs={12}>
        {certificateId ? (
          <TextField
            disabled
            value={certificateSchema?.title || ""}
            sx={{ width: "100%" }}
            label={t("input_certificatesLabel")}
          />
        ) : (
          <Controller
            name="certificateId"
            control={control}
            rules={{ validate: validateStaticField("certificateId") }}
            render={({ field: { onChange, value } }) => (
              <CertificatesTextField
                label={t("input_certificatesLabel")}
                value={value}
                onChange={onChange}
                onChangeSchema={(schema) => {
                  setSelectedSchema(schema);
                  setValue("credentialSubject", {});
                  setValue("hasLoadCertificateSchema", false);
                }}
                required
                error={!!errors.certificateId || !!loadSchemaErrorMessage}
                helperText={
                  errors.certificateId?.message || loadSchemaErrorMessage
                }
                listStudentCertificateIds={listStudentCertificateIds}
              />
            )}
          />
        )}
      </Grid>
      <Controller
        control={control}
        name="hasLoadCertificateSchema"
        rules={{ validate: validateStaticField("hasLoadCertificateSchema") }}
        render={() => <input hidden />}
      />
      {isLoadingSchema && fetchStatus !== "idle" && (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ width: 1, height: 100 }}
        >
          <CircularProgress />
        </Stack>
      )}
      {fields.map((entry) => {
        const [name, field] = entry;
        return (
          <Grid item xs={6} key={name} display="flex" alignItems="center">
            <Controller
              name={`credentialSubject.${name}`}
              control={control}
              rules={{
                validate: validateDynamicField(field, checkIsRequired(name)),
              }}
              defaultValue={getFieldDefaultValue(field)}
              render={({ field: { onChange, value } }) => {
                if (field.type === "boolean") {
                  return (
                    <FormControl
                      fullWidth
                      error={!!errors?.credentialSubject?.[name]}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="default"
                            checked={
                              typeof value === "boolean"
                                ? value
                                : Boolean(value)
                            }
                            onChange={(e) => onChange(e.target.checked)}
                          />
                        }
                        label={getLabel(name, field)}
                        required={checkIsRequired(name)}
                      />
                      {errors?.credentialSubject?.[name]?.message && (
                        <FormHelperText error>
                          {errors?.credentialSubject?.[name]?.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  );
                }
                if (field.type === "integer") {
                  return (
                    <TextField
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (newValue === "") {
                          onChange("");
                          return;
                        }
                        const parsedValue = parseInt(e.target.value);
                        if (!isNaN(parsedValue)) {
                          onChange(parsedValue);
                        }
                      }}
                      value={value ?? ""}
                      type="number"
                      label={getLabel(name, field)}
                      required={checkIsRequired(name)}
                      fullWidth
                      error={!!errors?.credentialSubject?.[name]}
                      helperText={errors?.credentialSubject?.[name]?.message}
                    />
                  );
                }
                if (field.type === "number") {
                  return (
                    <TextField
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (newValue === "") {
                          onChange("");
                          return;
                        }
                        const parsedValue = parseFloat(e.target.value);
                        if (!isNaN(parsedValue)) {
                          onChange(parsedValue);
                        }
                      }}
                      value={value ?? ""}
                      type="number"
                      label={getLabel(name, field)}
                      required={checkIsRequired(name)}
                      fullWidth
                      error={!!errors?.credentialSubject?.[name]}
                      helperText={errors?.credentialSubject?.[name]?.message}
                      inputProps={{
                        step: 0.1,
                      }}
                    />
                  );
                }

                if (field.type === "string" && field.format === "date") {
                  return (
                    <DatePickerFormControl
                      value={value ? new Date(value as string) : null}
                      onChange={(newDate) => {
                        if (newDate && !isValid(newDate)) {
                          // use "-" as an invalid date string
                          onChange("-");
                          return;
                        }
                        const valueStr = newDate
                          ? format(newDate, API_DATE_PARAM_FORMAT)
                          : "";
                        onChange(valueStr);
                      }}
                      label={getLabel(name, field)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: checkIsRequired(name),
                          error: !!errors?.credentialSubject?.[name],
                          helperText:
                            errors?.credentialSubject?.[name]?.message,
                        },
                      }}
                      minDate={
                        name === "expireDate"
                          ? new Date(Date.now() + MILISECONDS_IN_A_DAY)
                          : undefined
                      }
                    />
                  );
                }
                if (field.type === "string" && field.format === "date-time") {
                  return (
                    <DateTimePickerFormControl
                      value={value ? new Date(value as string) : null}
                      onChange={(date) => {
                        if (date && !isValid(date)) {
                          onChange("-");
                        } else if (date) {
                          onChange(convertDateToUTCString(date));
                        } else {
                          onChange("");
                        }
                      }}
                      label={getLabel(name, field)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: checkIsRequired(name),
                          error: !!errors?.credentialSubject?.[name],
                          helperText:
                            errors?.credentialSubject?.[name]?.message,
                        },
                      }}
                      minDate={
                        name === "expireDate"
                          ? new Date(Date.now() + MILISECONDS_IN_A_DAY)
                          : undefined
                      }
                    />
                  );
                }

                return (
                  <TextField
                    onChange={onChange}
                    value={value ?? ""}
                    type={getTextFieldType(field)}
                    label={getLabel(name, field)}
                    required={checkIsRequired(name)}
                    fullWidth
                    error={!!errors?.credentialSubject?.[name]}
                    helperText={errors?.credentialSubject?.[name]?.message}
                  />
                );
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

const CertificateSection = styled(BaseCertificateSection)({});

export default CertificateSection;
