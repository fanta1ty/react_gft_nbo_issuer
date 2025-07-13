import * as yup from "yup";
import isEmail from "validator/lib/isEmail";
import isURL from "validator/lib/isURL";
import i18next from "i18next";

declare module "yup" {
  interface StringSchema {
    nationalId(): this;
    ip(): this;
  }
}

const getCustomYup = () => {
  yup.setLocale({
    mixed: {
      required: i18next.t("required"),
    },
  });

  yup.addMethod(yup.string, "email", function (message) {
    return this.test(
      "valid-email",
      message || i18next.t("invalidEmail"),
      (value) => {
        return value ? isEmail(value) : true;
      },
    );
  });

  yup.addMethod(yup.string, "url", function (message) {
    return this.test(
      "valid-url",
      message || i18next.t("invalidURL"),
      (value) => {
        return value ? isURL(value) : true;
      },
    );
  });

  yup.addMethod(yup.string, "nationalId", function (message) {
    return this.test(
      "valid-national-id",
      message || i18next.t("nationalIdLength"),
      (value) => {
        return value ? value.length === 10 : true;
      },
    );
  });

  yup.addMethod(yup.string, "ip", function (message) {
    return this.test("valid-ip", message || i18next.t("invalidIp"), (value) => {
      return value
        ? /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
            value,
          )
        : true;
    });
  });

  return yup;
};

export default getCustomYup;
