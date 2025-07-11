import { SyntheticEvent, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TextField, Autocomplete, styled } from "@mui/material";
import { City } from "country-state-city";
import { uniqBy } from "lodash";

type CityTextFieldProps = {
  country: string;
  onChange: (value: string | null) => void;
  errorMessage?: string;
  value: string;
};
const CityTextField = ({
  country,
  onChange,
  errorMessage,
  value,
}: CityTextFieldProps) => {
  const { t } = useTranslation();

  const listCity = useMemo(() => {
    return uniqBy(City.getCitiesOfCountry(country), "name").map(
      (city) => city.name,
    );
  }, [country]);

  return (
    <Autocomplete
      freeSolo
      value={value}
      disablePortal
      options={listCity}
      onChange={(_: SyntheticEvent, newValue: string | null) => {
        onChange(newValue || "");
      }}
      autoSelect
      renderInput={(params) => {
        return (
          <StyledTextField
            {...params}
            label={t("input_cityLabel")}
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
export default CityTextField;
