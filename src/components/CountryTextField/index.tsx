import { SyntheticEvent, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TextField, Autocomplete, styled } from "@mui/material";
import { Country } from "country-state-city";

type CountryTextFieldProps = {
  onChange: (value: string | null) => void;
  errorMessage?: string;
  value: string;
};
const CountryTextField = ({
  onChange,
  errorMessage,
  value,
}: CountryTextFieldProps) => {
  const { t } = useTranslation();

  const listCountry: string[] = useMemo(() => {
    return Country.getAllCountries().map((country) => country.isoCode);
  }, []);
  return (
    <Autocomplete
      value={value}
      options={listCountry}
      getOptionLabel={(option) => Country.getCountryByCode(option)?.name || ""}
      onChange={(_: SyntheticEvent, newValue: string | null) => {
        onChange(newValue);
      }}
      autoSelect
      renderInput={(params) => {
        return (
          <StyledTextField
            {...params}
            label={t("input_countryLabel")}
            variant="outlined"
            InputLabelProps={{ ...params.InputLabelProps, shrink: true }}
            InputProps={{ ...params.InputProps, notched: false }}
            error={!!errorMessage}
            helperText={errorMessage}
          />
        );
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
});
export default CountryTextField;
