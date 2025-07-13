import {
  Grid,
  TextField,
  InputAdornment,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NationalIdTextField, {
  LoadUserEnum,
  type NationalIdTextFieldProps,
} from "./NationalIdTextField";
import { validateStaticField, type FormDataType } from "../helpers/validations";
import { type TFunction } from "i18next";
import {
  AccountByNationalIdType,
  HasAccountType,
} from "@/api/useGetUserByNationalId";

const CandidateSection = ({
  setListStudentCertificateIds,
}: {
  setListStudentCertificateIds: Dispatch<SetStateAction<string[]>>;
}) => {
  const [userStatus, setUserState] = useState(LoadUserEnum.UNKNOWN);
  const [selectedUser, setSeletecUser] =
    useState<AccountByNationalIdType | null>(null);

  const {
    control,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext<FormDataType>();
  const { t } = useTranslation();

  const handleLoadUserStatusChange: NationalIdTextFieldProps["onChangeLoadUserStatus"] =
    ({ status, user }) => {
      setUserState(status);
      setSeletecUser(user ?? null);

      let firstName, lastName;

      if (
        status === LoadUserEnum.HAS_ACCOUNT ||
        status === LoadUserEnum.HAS_DID_BUT_NO_ACCOUNT
      ) {
        firstName = (user as HasAccountType).firstName;
        lastName = (user as HasAccountType).lastName;
      } else {
        firstName = "";
        lastName = "";
      }

      setValue("firstName", firstName as string);
      setValue("lastName", lastName as string);

      if (status === LoadUserEnum.HAS_ACCOUNT) {
        // clear the REQUIRED error on the inputs if any
        trigger("firstName");
        trigger("lastName");
      }
    };

  const certificateId = watch("certificateId");

  useEffect(() => {
    let hasAchieved = false;
    if (
      selectedUser &&
      selectedUser.message === "has_account" &&
      certificateId
    ) {
      hasAchieved = (selectedUser.certificates || []).some(
        ({ id }) => id === certificateId,
      );
    }
    setValue("hasAchievedCertificate", hasAchieved);
    trigger("hasAchievedCertificate");
  }, [certificateId, selectedUser, setValue, trigger]);
  useEffect(() => {
    if (selectedUser && selectedUser.message === "has_account") {
      setListStudentCertificateIds(
        selectedUser.certificates?.map((cer) => cer.id) || [],
      );
    }
  }, [certificateId, selectedUser, setListStudentCertificateIds]);
  return (
    <>
      <Grid container spacing={2.5}>
        <Grid item xs={4}>
          <Controller
            rules={{
              validate: validateStaticField("nationalId"),
            }}
            name="nationalId"
            control={control}
            render={({ field }) => (
              <NationalIdTextField
                {...field}
                label={t("input_nationalIDLabel")}
                required
                error={!!errors.nationalId}
                helperText={errors.nationalId?.message}
                fullWidth
                onChangeLoadUserStatus={handleLoadUserStatusChange}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="firstName"
            control={control}
            rules={{
              validate: validateStaticField("firstName"),
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("input_firstNameLabel")}
                required
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                fullWidth
                disabled={userStatus === LoadUserEnum.HAS_ACCOUNT}
                InputProps={{
                  notched: false,
                  endAdornment:
                    userStatus === LoadUserEnum.LOADING ? (
                      <InputAdornment position="end">
                        <CircularProgress size={16} />
                      </InputAdornment>
                    ) : null,
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <Controller
            name="lastName"
            control={control}
            rules={{
              validate: validateStaticField("lastName"),
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("input_lastNameLabel")}
                required
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                fullWidth
                disabled={userStatus === LoadUserEnum.HAS_ACCOUNT}
                InputProps={{
                  notched: false,
                  endAdornment:
                    userStatus === LoadUserEnum.LOADING ? (
                      <InputAdornment position="end">
                        <CircularProgress size={16} />
                      </InputAdornment>
                    ) : null,
                }}
              />
            )}
          />
        </Grid>
        <Controller
          control={control}
          name="hasAchievedCertificate"
          rules={{ validate: validateStaticField("hasAchievedCertificate") }}
          render={() => <input hidden />}
        />
      </Grid>
      {errors.hasAchievedCertificate ? (
        <FormHelperText error>
          {t("message_user_already_achieved_certificate")}
        </FormHelperText>
      ) : (
        getStatusMessage(userStatus, t)
      )}
    </>
  );
};

const getStatusMessage = (status: LoadUserEnum, t: TFunction) => {
  let message, isError;
  switch (status) {
    case LoadUserEnum.HAS_DID_BUT_NO_ACCOUNT: {
      message = t("message_has_did_but_no_account");
      isError = false;
      break;
    }
    case LoadUserEnum.NOT_FOUND: {
      message = t("message_no_user_found_with_national_id");
      isError = true;
      break;
    }
    case LoadUserEnum.ERROR: {
      message = t("message_failed_to_load_user_by_national_id");
      isError = true;
      break;
    }
    case LoadUserEnum.HAS_ACCOUNT:
    default: {
      message = "";
      isError = false;
      break;
    }
  }
  if (!message) {
    return null;
  }
  return (
    <FormHelperText
      sx={{ color: isError ? "custom.negative.6" : "custom.positive.8" }}
    >
      {message}
    </FormHelperText>
  );
};

export default CandidateSection;
