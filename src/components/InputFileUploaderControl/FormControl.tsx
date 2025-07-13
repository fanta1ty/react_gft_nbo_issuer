import { FormControl, InputLabel, FormHelperText, styled } from "@mui/material";
import type { FormControlProps, SxProps } from "@mui/material";
import { FileUploaderInputProps, InputFileUploader } from "./InputFileUploader";

type TProps = Omit<FormControlProps, "variant"> & {
  label?: React.ReactNode;
  value: File | null;
  onChange?: (newFile: File | null) => void;
  helperText?: React.ReactNode;
  FileInputProps?: Omit<FileUploaderInputProps, "value" | "onChange"> & SxProps;
};

const InputFileUploaderFormControl = (props: TProps) => {
  const {
    label,
    value,
    onChange,
    helperText,
    FileInputProps = {},
    ...formControlProps
  } = props;

  return (
    <FormControl
      {...formControlProps}
      sx={{
        width: "100%",
      }}
    >
      {label !== null && label !== "" && (
        <Label shrink sx={{ mb: 1 }} required={formControlProps.required}>
          {label}
        </Label>
      )}

      <InputFileUploader
        {...FileInputProps}
        value={value}
        onChange={onChange}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

const Label = styled(InputLabel)(({ theme }) => ({
  position: "relative",
  transform: "none",
  fontWeight: 600,
  fontSize: theme.typography.pxToRem(12),
  lineHeight: 16 / 12,
  color: theme.palette.custom.dark[6],
}));

export default InputFileUploaderFormControl;
