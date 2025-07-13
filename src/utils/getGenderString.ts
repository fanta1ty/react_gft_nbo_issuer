import { GenderType } from "@/types";
import i18next from "i18next";

const getGenderString = (gender: GenderType) => {
  if (gender === "F") {
    return i18next.t("female");
  }
  return i18next.t("male");
};
export default getGenderString;
