import { Ref, forwardRef } from "react";
import debounce from "lodash/debounce";
import { TextField, styled, type TextFieldProps } from "@mui/material";

const DEFAULT_DELAY_IN_MS = 300;

type Props = Omit<TextFieldProps, "onChange" | "value"> & {
  delay?: number;
  onChange: Exclude<TextFieldProps["onChange"], undefined>; // make the onChange function required
};

const DebouncedTextField = styled(
  forwardRef((props: Props, ref?: Ref<HTMLDivElement>) => {
    const { delay = DEFAULT_DELAY_IN_MS, onChange, ...textFieldProps } = props;

    const debouncedOnChange = debounce(onChange, delay);
    return (
      <TextField {...textFieldProps} ref={ref} onChange={debouncedOnChange} />
    );
  }),
)({});

export default DebouncedTextField;
