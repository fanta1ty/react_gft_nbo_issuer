import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { MenuItem, TextField, Box } from "@mui/material";
import { SupportedLocales, localeState } from "@/recoil/atoms";
import { ReactComponent as ENIcon } from "@/assets/icons/EN.svg";
import { ReactComponent as ARIcon } from "@/assets/icons/AR.svg";
import { ReactComponent as ArrowDownIcon } from "@/assets/icons/ic_arrow_down.svg";

const LocaleSelect = () => {
  const [locale, setLocale] = useRecoilState(localeState);

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);
  const getLocalIcon = (locale: SupportedLocales) => {
    if (locale === SupportedLocales.AR_SA) {
      return <ARIcon />;
    }
    return <ENIcon />;
  };
  const getLocalText = (locale: SupportedLocales) => {
    switch (locale) {
      case SupportedLocales.AR_SA:
        return "SA";
      default:
        return "EN";
    }
  };
  return (
    <TextField
      select
      sx={{
        width: "100px",
        "& fieldset": { border: "none !important" },
        ".MuiSelect-select": { paddingRight: "0px !important" },
        ".MuiInputBase-root": { backgroundColor: "unset" },
      }}
      value={locale}
      onChange={(e) => setLocale(e.target.value as SupportedLocales)}
      SelectProps={{
        IconComponent: () => (
          <Box
            pt={1.5}
            sx={{
              position: "absolute !important",
              right: "0 !important",
              pointerEvents: "none !important",
            }}
          >
            <ArrowDownIcon width={32} />
          </Box>
        ),
      }}
    >
      {Object.values(SupportedLocales).map((supportedLocale) => {
        return (
          <MenuItem key={supportedLocale} value={supportedLocale}>
            <Box display="flex">
              <Box pt={0.5}>{getLocalIcon(supportedLocale)}</Box>
              <Box ml={1}>{getLocalText(supportedLocale)}</Box>
            </Box>
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default LocaleSelect;
