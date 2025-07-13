import { type ReactNode } from "react";
import { type AlertProps } from "@mui/material";
import { atom } from "recoil";
// import * as locales from "@mui/material/locale";

// type MUISupportedLocales = keyof typeof locales;
export enum SupportedLocales {
  AR_SA = "arSA",
  EN_US = "enUS",
}

export const localeState = atom<SupportedLocales>({
  key: "localeState",
  default: SupportedLocales.EN_US,
});

export type GlobalSnackbarType = {
  message: ReactNode;
  severity: AlertProps["severity"];
};
export const globalSnackbarState = atom<GlobalSnackbarType>({
  key: "globalSnackbarState",
  default: { message: "", severity: "success" },
});

export const globalProgressOverlayShowState = atom({
  key: "globalProgressOverlayShowState",
  default: false,
});

export * from "./casbin";
