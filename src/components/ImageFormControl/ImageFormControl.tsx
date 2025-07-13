import { FormControl, InputLabel, FormHelperText, styled } from "@mui/material";
import type { FormControlProps, SxProps } from "@mui/material";
import ImageInput, { ImageInputProps } from "./ImageInput";

type TProps = Omit<FormControlProps, "variant"> & {
  label?: React.ReactNode;
  value: File | null;
  onChange: (newFile: File | null) => void;
  helperText?: React.ReactNode;
  ImageInputProps?: Omit<ImageInputProps, "value" | "onChange"> & SxProps;
};

const ImageFormControl = (props: TProps) => {
  const {
    label,
    value,
    onChange,
    helperText,
    ImageInputProps = {},
    ...formControlProps
  } = props;

  return (
    <FormControl {...formControlProps}>
      {label !== null && label !== "" && (
        <Label shrink sx={{ mb: 1 }}>
          {label}
        </Label>
      )}

      <ImageInput {...ImageInputProps} value={value} onChange={onChange} />
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

export default ImageFormControl;
