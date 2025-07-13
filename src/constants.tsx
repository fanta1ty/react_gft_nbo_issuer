import { ReactComponent as SAIcon } from "@/assets/flags/SA.svg";
import { ReactComponent as PLIcon } from "@/assets/flags/PL.svg";

export const DATE_FORMAT = "dd-MM-yyyy";
export const DATE_TIME_FORMAT = "dd-MM-yyyy hh:mm a";

export const API_DATE_PARAM_FORMAT = "yyyy-MM-dd";

export const OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "A - Z", value: "a-z" },
  { label: "Z - A", value: "z-a" },
];
export enum CREDENTIAL_STATUS {
  PENDING = "Pending",
  EXPIRED = "Expired",
  REVOKED = "Revoked",
  ASSIGNED = "Assigned",
  PUBLISHED = "Published",
}

export const MILISECONDS_IN_A_DAY = 3600 * 1000 * 24;

export const PHONE_COUNTRIES = {
  PL: {
    short: "PL",
    code: "+48",
    name: "Poland",
    placeholder: "XXX XXX XXX",
    flag: <PLIcon width={26} height={16} />,
    amount: 9,
    longAmount: 12,
    format: (input: string) => {
      const noIndexInput = input.startsWith("+48") ? input.substring(3) : input;
      const digits = noIndexInput.replace(/\D/g, "");
      const formatted = digits.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
      return formatted;
    },
  },
  SA: {
    short: "SA",
    code: "+966",
    name: "Saudi Arabia",
    placeholder: "XXX XXXX",
    flag: <SAIcon width={26} height={16} />,
    amount: 7,
    longAmount: 11,
    format: (input: string) => {
      const noIndexInput = input.startsWith("+966")
        ? input.substring(4)
        : input;
      const digits = noIndexInput.replace(/\D/g, "");
      const formatted = digits.replace(/(\d{3})(\d{3})/, "$1 $2");
      return formatted;
    },
  },
};
export enum TemplateStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export enum RepresentativeStatus {
  INVITED = "invited",
  ACTIVE = "active",
  BLACKLISTED = "blacklisted",
  EXPIRED = "expired",
}
