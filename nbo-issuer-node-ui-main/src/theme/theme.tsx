import { CSSProperties, useMemo } from "react";
import {
  createTheme,
  type PaletteColor,
  type ThemeOptions,
} from "@mui/material";
/** https://mui.com/x/react-data-grid/getting-started/#typescript */
import type {} from "@mui/x-data-grid/themeAugmentation";
import * as locales from "@mui/material/locale";
import { useRecoilValue } from "recoil";
import { localeState } from "@/recoil/atoms";
import { ReactComponent as IconClose } from "@/assets/icons/ic_close.svg";
import { ReactComponent as IconArrowSolidDown } from "@/assets/icons/ic_arrow_solid_down.svg";
import { ReactComponent as IconArrowSolidUp } from "@/assets/icons/ic_arrow_solid_up.svg";
import { blue, dark, warning, positive, negative, wallet } from "./colors";

const rawTheme = createTheme();
const pxToRem = rawTheme.typography.pxToRem;
const spacing = rawTheme.spacing;
const MAIN_COLOR = "#0E5AEE";
declare module "@mui/material/styles" {
  interface Palette {
    black: PaletteColor;
    positive: PaletteColor;
    custom: {
      blue: string[];
      dark: string[];
      warning: string[];
      positive: string[];
      negative: string[];
    };
  }
  interface PaletteOptions {
    black: PaletteColor;
    positive: PaletteColor;
    custom: {
      blue: string[];
      dark: string[];
      warning: string[];
      positive: string[];
      negative: string[];
      wallet: {
        primary: string;
      };
    };
  }

  interface TypographyVariants {
    text24: CSSProperties;
    text20: CSSProperties;
    text18: CSSProperties;
    text16: CSSProperties;
    text14: CSSProperties;
    text12: CSSProperties;
    text10: CSSProperties;
  }
  interface TypographyVariantsOptions {
    text24: CSSProperties;
    text20: CSSProperties;
    text18: CSSProperties;
    text16: CSSProperties;
    text14: CSSProperties;
    text12: CSSProperties;
    text10: CSSProperties;
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    black: true;
  }

  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}
declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    black: true;
    positive: true;
  }
  interface ChipPropsSizeOverrides {
    large: true;
  }
  interface ChipClasses {
    sizeLarge: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    text24: true;
    text20: true;
    text18: true;
    text16: true;
    text14: true;
    text12: true;
    text10: true;
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    primary: rawTheme.palette.augmentColor({
      color: {
        main: MAIN_COLOR,
        contrastText: "#fff",
      },
    }),
    error: rawTheme.palette.augmentColor({
      color: { main: negative[6] },
    }),
    custom: {
      blue,
      dark,
      warning,
      positive,
      negative,
      wallet,
    },
    black: rawTheme.palette.augmentColor({ color: { main: dark[6] } }),
    positive: rawTheme.palette.augmentColor({ color: { main: positive[6] } }),
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(", "),
    h1: {
      fontSize: pxToRem(60),
      lineHeight: 72 / 60,
      fontWeight: 600,
    },
    h2: {
      fontSize: pxToRem(48),
      lineHeight: 56 / 48,
      fontWeight: 600,
    },
    h3: {
      fontSize: pxToRem(40),
      lineHeight: 48 / 40,
      fontWeight: 600,
    },
    h4: {
      fontSize: pxToRem(32),
      lineHeight: 40 / 32,
      fontWeight: 600,
    },
    text24: {
      fontSize: pxToRem(24),
      lineHeight: 32 / 24,
      fontWeight: 600,
    },
    text20: {
      fontSize: pxToRem(20),
      lineHeight: 28 / 20,
      fontWeight: 600,
    },
    text18: {
      fontSize: pxToRem(18),
      lineHeight: 26 / 18,
      fontWeight: 600,
    },
    text16: {
      fontSize: pxToRem(16),
      lineHeight: 24 / 16,
      fontWeight: 600,
    },
    text14: {
      fontSize: pxToRem(14),
      lineHeight: 20 / 14,
      fontWeight: 600,
    },
    text12: {
      fontSize: pxToRem(12),
      lineHeight: 16 / 12,
      fontWeight: 600,
    },
    text10: {
      fontSize: pxToRem(10),
      lineHeight: 12 / 10,
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { height: "100%", backgroundColor: "#F7F8FA" },
        html: {
          height: "100%",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          text24: "p",
          text20: "p",
          text18: "p",
          text16: "p",
          text14: "p",
          text12: "p",
          text10: "p",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "dashed" },
          style: {
            border: `2px dashed ${dark[6]}`,
            backgroundColor: "#FFF",
            borderRadius: "12px",
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            border: `1px solid ${dark[2]}`,
          },
        },
      ],
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          borderRadius: "5em",
          textTransform: "none",
          fontWeight: 600,
          paddingLeft: spacing(3),
          paddingRight: spacing(3),
        },
        sizeMedium: {
          height: 48,
          fontSize: pxToRem(16),
        },
        sizeLarge: {
          height: 56,
          fontSize: pxToRem(16),
        },
        sizeSmall: {
          height: 36,
          fontSize: pxToRem(14),
        },
        outlined: {
          backgroundColor: "#fff",
          "&:hover": {
            backgroundColor: dark[1],
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          border: `1px solid ${blue[2]}`,
          backgroundColor: blue[1],
          borderRadius: 12,
        },
        sizeLarge: {
          height: 56,
          width: 56,
        },
        sizeMedium: {
          height: 48,
          width: 48,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&:not(.MuiInputBase-inputMultiline)": {
            borderRadius: 12,
            padding: "14px 16px",
            "&.MuiInputBase-inputAdornedStart": {
              paddingLeft: 0,
            },
          },
          "&.MuiSelect-select": {
            // override auto style, will get min-height value
            height: "1px",
          },
          "&.Mui-disabled": {
            backgroundColor: dark[1],
            WebkitTextFillColor: "unset",
            "& + .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
        InputProps: {
          notched: false,
        },
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            backgroundColor: "#fff",
          },

          "& .MuiInputBase-input": {
            fontSize: pxToRem(14),
            fontWeight: 400,
            color: dark[6],
            "&::placeholder": {
              opacity: 1,
              color: blue[6],
            },
          },
          "& .MuiInputLabel-shrink": {
            position: "relative",
            transform: "none",
            fontWeight: 600,
            fontSize: 12,
            lineHeight: 16 / 12,
            marginBottom: spacing(1),
            "&:not(.Mui-focused):not(.Mui-error)": {
              color: dark[6],
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: `2px solid ${dark[7]}`,
            borderRadius: 12,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.text12,
          margin: spacing(1, 0, 0),
          fontWeight: 400,
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        filled: {
          "&.MuiChip-colorDefault": {
            backgroundColor: blue[1],
          },
          "&.MuiChip-colorPositive": {
            backgroundColor: positive[2],
            color: wallet.primary,
            fontWeight: 600,
          },
        },
        clickable: {
          "&.MuiChip-colorDefault:hover": {
            backgroundColor: blue[2],
          },
        },
        sizeLarge: {
          borderRadius: 12,
          height: 40,
          fontSize: pxToRem(14),
          "& .MuiChip-label": {
            padding: spacing(0, 2),
          },
          "&.MuiChip-clickable, &.MuiChip-deletable": {
            borderRadius: 8,
            height: 48,
            fontSize: pxToRem(14),
            "& .MuiChip-label": {
              padding: spacing(0, 2),
            },
          },
        },
        sizeMedium: {
          borderRadius: 4,
          height: 28,
          fontSize: pxToRem(12),
          "& .MuiChip-label": {
            padding: spacing(0, 1.5),
          },
          "&.MuiChip-clickable, &.MuiChip-deletable": {
            borderRadius: 8,
            height: 40,
            fontSize: pxToRem(14),
            "& .MuiChip-label": {
              padding: spacing(0, 2),
            },
          },
        },
        sizeSmall: {
          borderRadius: 4,
          height: 20,
          fontSize: pxToRem(10),
          "& .MuiChip-label": {
            padding: spacing(0, 1),
          },
          "&.MuiChip-clickable, &.MuiChip-deletable": {
            borderRadius: 8,
            height: 32,
            fontSize: pxToRem(14),
            "& .MuiChip-label": {
              padding: spacing(0, 2),
            },
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        ChipProps: {
          size: "small",
          deleteIcon: <IconClose width={16} height={16} />,
        },
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            minHeight: 48,
            padding: spacing(0.5, 1),
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: blue[1],
          border: `1px solid ${blue[6]}`,
          borderRadius: "100px",

          "&.Mui-active": {
            color: dark[6],
            border: "none",

            "& text": {
              fill: "#fff",
            },
          },

          "&.Mui-completed": {
            border: `1px solid ${positive[6]}`,
            fill: positive[1],
            background: positive[6],
          },
        },
        text: {
          fill: blue[6],
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: dark[6],
          "&.Mui-completed": {
            fontWeight: 400,
          },
        },
      },
    },
    MuiDataGrid: {
      defaultProps: {
        slots: {
          columnSortedAscendingIcon: IconArrowSolidDown,
          columnSortedDescendingIcon: IconArrowSolidUp,
        },
      },
      styleOverrides: {
        root: {
          border: "none",
          "& .MuiIconButton-root": {
            border: "none",
            backgroundColor: "#FFF",
          },
        },

        footerContainer: {
          border: "none",
          marginTop: "-20px",
        },
        cell: {
          border: "none",
          borderTop: `1px solid rgb(132, 168, 87, 0.12)`,
          "&:focus-within, &:focus": {
            outline: "none",
          },
        },
        columnHeaders: {
          border: "none",
        },
        columnHeader: {
          outline: "none !important",
        },
        columnHeaderTitle: {
          border: "none",
          color: blue[7],
          fontWeight: 400,
        },

        iconButtonContainer: {
          border: "none",
        },
        row: {
          "&:hover": {
            backgroundColor: "unset",
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: "none",
          backgroundColor: "#FFF",
          height: 48,
          width: 48,
          borderRadius: 12,
          "&.Mui-selected": {
            border: "none",
            backgroundColor: MAIN_COLOR,
            color: blue[1],
          },
          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }),
        ellipsis: {
          lineHeight: "48px",
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        backdrop: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: ({ theme }) => ({
          backdropFilter: "blur(10px)",
          "& .MuiDialogTitle-root": {
            ...theme.typography.text24,
            padding: theme.spacing(5),
            display: "flex",
            justifyContent: "space-between",
            "& [aria-label='close']": {
              position: "absolute",
              top: theme.spacing(2),
              right: theme.spacing(2),
            },
          },
          "& .MuiDialogContent-root": {
            padding: theme.spacing(0, 5),
          },
          "& .MuiDialogActions-root": {
            padding: theme.spacing(5),
          },
        }),
        paper: {
          borderRadius: 12,
          boxShadow: "none",
        },
      },
    },
  },
};

const useThemeWithLocale = () => {
  const locale = useRecoilValue(localeState);

  const theme = useMemo(
    // eslint-disable-next-line import/namespace
    () => createTheme(themeOptions, locales[locale]),
    [locale],
  );

  return theme;
};

export default useThemeWithLocale;
