import { Ref, forwardRef } from "react";
import { TextField, type TextFieldProps } from "@mui/material";
import { debounce } from "lodash";
import useGetUserByNationalId, {
  type AccountByNationalIdType,
} from "@/api/useGetUserByNationalId";

import { CustomAxiosError } from "@/api/apiService";
import { LoadUserEnum } from "./enums";

export type NationalIdTextFieldProps = Omit<
  TextFieldProps,
  "value" | "onChange"
> & {
  value: string | null;
  onChange: (value: string | null) => void;
  onChangeLoadUserStatus: (props: {
    status: LoadUserEnum;
    user?: AccountByNationalIdType;
    error?: CustomAxiosError;
  }) => void;
};

const NationalIdTextField = forwardRef(
  (props: NationalIdTextFieldProps, ref?: Ref<HTMLDivElement>) => {
    const { value, onChange, onChangeLoadUserStatus, ...textFieldProps } =
      props;
    const { refetch } = useGetUserByNationalId(
      { nationalId: value || "" },
      {
        enabled: false,
        onSuccess: (user: AccountByNationalIdType) => {
          if (user.message === "has_no_account") {
            onChangeLoadUserStatus({ status: LoadUserEnum.NOT_FOUND });
            return;
          }
          const status =
            (user.certificates || []).length === 0
              ? LoadUserEnum.HAS_DID_BUT_NO_ACCOUNT
              : LoadUserEnum.HAS_ACCOUNT;

          onChangeLoadUserStatus({ status, user });
        },
        onError: (error) => {
          console.error("Error while loading user: ", error);
          onChangeLoadUserStatus({
            status: LoadUserEnum.ERROR,
            error,
          });
        },
      },
    );

    const debouncedFetchUser = debounce(() => {
      onChangeLoadUserStatus({ status: LoadUserEnum.LOADING });
      refetch();
    }, 300);

    const handleOnChange: TextFieldProps["onChange"] = (event) => {
      const newValue = event.target.value;
      if (newValue) {
        debouncedFetchUser();
      } else {
        onChangeLoadUserStatus({ status: LoadUserEnum.UNKNOWN });
      }
      onChange(newValue);
    };

    return (
      <TextField
        value={value}
        onChange={handleOnChange}
        {...textFieldProps}
        ref={ref}
      />
    );
  },
);

export default NationalIdTextField;
