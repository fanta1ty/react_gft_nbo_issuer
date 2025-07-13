import { useTranslation } from "react-i18next";
import {
  Chip,
  InputLabel,
  FormControl,
  FormHelperText,
  Box,
  styled,
  type FormControlProps,
} from "@mui/material";
import { GenderType } from "../../types";

type GenderFormControlProps = {
  value: GenderType;
  onChange: (value: string) => void;
  helperText?: React.ReactNode;
} & FormControlProps;

const GenderFormControl = ({
  value,
  onChange,
  helperText,
  ...props
}: GenderFormControlProps) => {
  const { t } = useTranslation();

  return (
    <>
      <FormControl {...props}>
        <Label shrink sx={{ mb: 1, fontWeight: 600 }}>
          {t("input_genderLabel")}
        </Label>
        <Box>
          <Chip
            label={t("input_genderLabelMale")}
            size="large"
            sx={{ mr: 1 }}
            variant={value === "M" ? "outlined" : "filled"}
            onClick={() => onChange("M")}
          />
          <Chip
            label={t("input_genderLabelFemale")}
            size="large"
            variant={value === "F" ? "outlined" : "filled"}
            onClick={() => onChange("F")}
          />
        </Box>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
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
export default GenderFormControl;
