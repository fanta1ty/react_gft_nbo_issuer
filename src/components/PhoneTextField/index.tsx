import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  type SelectChangeEvent,
  TextField,
  styled,
} from "@mui/material";
import { FieldError } from "react-hook-form";
import { PHONE_COUNTRIES } from "@/constants";
import { PhoneCountryKey } from "@/types";
import { getCountryCode } from "@/utils/phoneOperations";

type PhoneTextFieldProps = {
  onChange: (value: string | null) => void;
  error?: FieldError;
  value: string;
  phoneCountryCode: "PL" | "SA";
  label?: string;
};
const PhoneTextField = ({
  onChange,
  error,
  value,
  phoneCountryCode,
  label,
}: PhoneTextFieldProps) => {
  const { t } = useTranslation();
  const [country, setCountry] = useState(
    PHONE_COUNTRIES[getCountryCode(value) || phoneCountryCode],
  );
  const [phone, setPhone] = useState(country.format(value));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhone(country.format(newPhone));
    onChange(country.code + newPhone.replace(/\s+/g, ""));
  };

  const handleSelectChange = (e: SelectChangeEvent<unknown>) => {
    const key = e.target.value;
    const newCountry = PHONE_COUNTRIES[key as PhoneCountryKey];
    setCountry(newCountry);
    if (phone.length === 0) return;
    setPhone(newCountry.format(phone));
    onChange(newCountry.code + phone.replace(/\s+/g, ""));
  };

  return (
    <StyledTextField
      required
      fullWidth
      value={phone}
      label={label ?? t("input_phoneLabel")}
      variant="outlined"
      error={!!error}
      helperText={error?.message}
      placeholder={country.placeholder}
      onChange={handleInputChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <StyledSelect
              key={country.short}
              value={country.short}
              onChange={handleSelectChange}
              renderValue={() => (
                <StyledContainer>
                  <StyledFlagContainer>{country.flag}</StyledFlagContainer>
                  {country.code}
                  <StyledDivider />
                </StyledContainer>
              )}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
              }}
            >
              {Object.keys(PHONE_COUNTRIES).map((countryKey) => {
                const { flag, name, code } =
                  PHONE_COUNTRIES[countryKey as PhoneCountryKey];
                return (
                  <MenuItem
                    value={countryKey}
                    key={countryKey}
                    sx={{ display: "flex", gap: 2 }}
                  >
                    {flag}
                    <Box>{name}</Box>
                    <Box>{code}</Box>
                  </MenuItem>
                );
              })}
            </StyledSelect>
          </InputAdornment>
        ),
      }}
    />
  );
};

const StyledTextField = styled(TextField)({
  ".MuiIconButton-root": {
    border: "none",
    backgroundColor: "transparent",
  },
  ".MuiIconButton-sizeMedium": {
    height: 30,
  },
  "& legend": {
    display: "none",
  },
});

const StyledSelect = styled(Select)({
  "&.MuiInputBase-root": {
    backgroundColor: "transparent",
  },
  "& .MuiSelect-select": {
    paddingTop: "10px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiOutlinedInput-notchedOutline legend": {
    display: "none",
  },
});

const StyledContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  position: "relative",
});

const StyledFlagContainer = styled(Box)({
  display: "flex",
  marginTop: "-3px",
});

const StyledDivider = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: "-30px",
  height: "24px",
  width: "1px",
  backgroundColor: theme.palette.custom.dark[2],
}));

export default PhoneTextField;
