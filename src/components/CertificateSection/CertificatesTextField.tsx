import { Ref, SyntheticEvent, forwardRef, useMemo, useState } from "react";
import {
  Autocomplete,
  TextField,
  styled,
  Typography,
  type TextFieldProps,
  type OutlinedInputProps,
} from "@mui/material";
import debounce from "lodash/debounce";
import useLoadCertificateOptions from "./useLoadCertificateOptions";
import { CertificateSchemaType } from "@/types";

type Props = Omit<TextFieldProps, "value" | "onChange"> & {
  value: string | null;
  onChange: (value: string | null) => void;
  onChangeSchema?: (schema: CertificateSchemaType | null) => void;
  listStudentCertificateIds?: string[];
};

const CertificatesTextField = forwardRef(
  (props: Props, ref?: Ref<HTMLDivElement>) => {
    const {
      value,
      onChange,
      onChangeSchema,
      listStudentCertificateIds,
      ...textFieldProps
    } = props;
    const [isFocused, setIsFocused] = useState(false);
    const [keyword, setKeyword] = useState("");
    const { data: certificateSchemas, isLoading } = useLoadCertificateOptions({
      keyword,
      enabled: isFocused,
    });
    const getSchema = useMemo(
      () => createGetSchemaFunc(certificateSchemas),
      [certificateSchemas],
    );

    const schemaIds = useMemo(() => {
      return (certificateSchemas || []).map(({ id }) => id);
    }, [certificateSchemas]);

    const handleInputChange = debounce((_, newKeyword) => {
      setKeyword(newKeyword);
    }, 300);

    const handleChange = (_: SyntheticEvent, newValue: string | null) => {
      onChange(newValue);
      onChangeSchema?.(getSchema(newValue));
    };
    return (
      <Autocomplete
        clearOnBlur
        selectOnFocus
        loading={isLoading}
        options={schemaIds}
        onOpen={() => setIsFocused(true)}
        value={value}
        onChange={handleChange}
        getOptionLabel={(schemaId) => {
          const schema = getSchema(schemaId);
          return schema?.title || "";
        }}
        getOptionDisabled={(option) => {
          return !!listStudentCertificateIds?.includes(option);
        }}
        onInputChange={handleInputChange}
        filterOptions={(v) => v}
        renderOption={(props, option, _, ownerState) => {
          const schema = getSchema(option);
          if (!schema) {
            return null;
          }

          return (
            <StyledOption {...props} key={option}>
              <Typography variant="text14" fontWeight={600}>
                {ownerState.getOptionLabel(option)}
              </Typography>
            </StyledOption>
          );
        }}
        renderInput={(params) => {
          const InputLabelProps = { ...params.InputLabelProps, shrink: true };
          const InputProps: Partial<OutlinedInputProps> = {
            ...params.InputProps,
            notched: false,
          };
          return (
            <StyledTextField
              {...params}
              ref={ref}
              InputLabelProps={InputLabelProps}
              InputProps={InputProps}
              variant="outlined"
              {...textFieldProps}
            />
          );
        }}
      />
    );
  },
);

const createGetSchemaFunc = function <T extends { id: string }>(
  schemas: T[] | undefined,
) {
  const map = Object.fromEntries(
    (schemas || []).map((schema) => [schema.id, schema]),
  );

  return (value: string | null) => {
    const schema = value ? map[value] : null;
    return schema;
  };
};

const StyledTextField = styled(TextField)({
  ".MuiIconButton-root": {
    border: "none",
    backgroundColor: "transparent",
  },
  ".MuiIconButton-sizeMedium": {
    height: 30,
  },
});

const StyledOption = styled("li")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  gap: theme.spacing(1),
  "&.MuiAutocomplete-option[aria-disabled='true']": {
    opacity: 1,
    "& > *": {
      opacity: 0.4,
    },
    "& > .label-achieved": {
      opacity: 1,
    },
  },
}));

export default CertificatesTextField;
