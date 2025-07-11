import { forwardRef } from "react";
import deepmerge from "deepmerge";
import { styled, InputAdornment, IconButton } from "@mui/material";
import { DateTimePicker, type DateTimePickerProps } from "@mui/x-date-pickers";
import { ReactComponent as IconCalendar } from "@/assets/icons/ic_calendar.svg";
import { DATE_TIME_FORMAT } from "@/constants";

type Props<T = Date> = DateTimePickerProps<T> & { name?: string };

const DateTimePickerFormControl = forwardRef(
  (props: Props, ref?: React.Ref<HTMLDivElement>) => {
    const dateFormat = props.format || DATE_TIME_FORMAT;

    const slotProps: Props["slotProps"] = deepmerge(props.slotProps || {}, {
      textField: {
        variant: "outlined",
        InputLabelProps: {
          shrink: true,
        },
        InputProps: {
          notched: false,
          ...(props.name ? { name: props.name } : {}),
        },
      },
    });

    const slots: Props["slots"] = {
      ...(props.slots || {}),
      inputAdornment: StyledInputAdornment,
      switchViewButton: StyledIconButton,
      previousIconButton: StyledIconButton,
      nextIconButton: StyledIconButton,
      openPickerIcon: IconCalendar,
    };

    return (
      <DateTimePicker
        {...props}
        format={dateFormat}
        ref={ref}
        slotProps={slotProps}
        slots={slots}
      />
    );
  },
);

const StyledInputAdornment = styled(InputAdornment)({
  ".MuiIconButton-root": {
    border: "none",
    backgroundColor: "transparent",
  },
});
const StyledIconButton = styled(IconButton)({
  border: "none",
  backgroundColor: "transparent",
});

export default DateTimePickerFormControl;
