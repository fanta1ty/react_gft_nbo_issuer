import { Ref, SyntheticEvent, forwardRef, useMemo, useState } from "react";
import {
  Autocomplete,
  TextField,
  styled,
  Avatar,
  Typography,
  Stack,
  InputAdornment,
  type TextFieldProps,
  type OutlinedInputProps,
} from "@mui/material";
import debounce from "lodash/debounce";
import getImageUrl from "@/utils/getImageUrl";
import { ReactComponent as IconCheck } from "@/assets/icons/ic_check.svg";
import { isStudentAchievedCertificate, useLoadStudentOptions } from "./helpers";
import { useTranslation } from "react-i18next";

type Props = Omit<TextFieldProps, "value" | "onChange"> & {
  value: string | null;
  onChange: (value: string | null) => void;
  certificateId: string;
};

const StudentsTextField = forwardRef(
  (props: Props, ref?: Ref<HTMLDivElement>) => {
    const { value, onChange, certificateId, ...textFieldProps } = props;
    const [isFocused, setIsFocused] = useState(false);
    const [keyword, setKeyword] = useState("");
    const { data: students, isLoading } = useLoadStudentOptions({
      keyword,
      enabled: isFocused,
      certificateId,
    });
    const getStudent = useMemo(
      () => createGetStudentFunc(students),
      [students],
    );
    const { t } = useTranslation();
    const studentIds = useMemo(() => {
      return (students || []).map((student) => student.id);
    }, [students]);

    const handleInputChange = debounce((_, newKeyword) => {
      setKeyword(newKeyword);
    }, 300);

    const handleChange = (_: SyntheticEvent, newValue: string | null) => {
      onChange(newValue);
    };

    return (
      <Autocomplete
        clearOnBlur
        selectOnFocus
        loading={isLoading}
        options={studentIds}
        onOpen={() => setIsFocused(true)}
        value={value}
        onChange={handleChange}
        getOptionLabel={(studentId) => {
          const student = getStudent(studentId);
          return student ? `${student.firstName} ${student.lastName}` : "";
        }}
        onInputChange={handleInputChange}
        filterOptions={(v) => v}
        getOptionDisabled={(option) => {
          const student = getStudent(option);
          if (!student) {
            return true;
          }
          const isAchieved = isStudentAchievedCertificate(
            student,
            certificateId,
          );
          return isAchieved;
        }}
        renderOption={(props, option, _, ownerState) => {
          const student = getStudent(option);
          if (!student) {
            return null;
          }
          const isAchieved = isStudentAchievedCertificate(
            student,
            certificateId,
          );
          return (
            <StyledOption {...props} key={option}>
              <Avatar src={getImageUrl(student.avatar)} />
              <Typography variant="text14" fontWeight={600}>
                {ownerState.getOptionLabel(option)}
              </Typography>
              {isAchieved && (
                <Stack
                  direction="row"
                  alignItems="center"
                  className="label-achieved"
                  gap={0.5}
                  sx={{ ml: "auto" }}
                  color="custom.positive.8"
                >
                  <IconCheck />
                  <Typography variant="text14" fontWeight={400}>
                    {t("already_achieved_Lbl")}
                  </Typography>
                </Stack>
              )}
            </StyledOption>
          );
        }}
        renderInput={(params) => {
          const student = getStudent(value);
          const InputLabelProps = { ...params.InputLabelProps, shrink: true };
          const InputProps: Partial<OutlinedInputProps> = {
            ...params.InputProps,
            notched: false,
            startAdornment: student ? (
              <InputAdornment position="start">
                <Avatar
                  src={getImageUrl(student.avatar)}
                  sx={{ width: 32, height: 32 }}
                />
              </InputAdornment>
            ) : null,
          };
          return (
            <StyledTextField
              {...params}
              ref={ref}
              InputLabelProps={InputLabelProps}
              InputProps={InputProps}
              variant="outlined"
              {...textFieldProps}
            />
          );
        }}
      />
    );
  },
);

const createGetStudentFunc = function <T extends { id: string }>(
  students: T[] | undefined,
) {
  const map = Object.fromEntries(
    (students || []).map((student) => [student.id, student]),
  );

  return (value: string | null) => {
    const student = value ? map[value] : null;
    return student;
  };
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

const StyledOption = styled("li")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  gap: theme.spacing(1),
  "&.MuiAutocomplete-option[aria-disabled='true']": {
    opacity: 1,
    "& > *": {
      opacity: 0.4,
    },
    "& > .label-achieved": {
      opacity: 1,
    },
  },
}));

export default StudentsTextField;
