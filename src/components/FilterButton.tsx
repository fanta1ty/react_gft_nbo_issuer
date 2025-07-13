import { Button, styled, Menu, MenuItem } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { ReactComponent as IconArrowDown } from "@/assets/icons/ic_arrow_down.svg";
import { Ref, forwardRef, useRef, useState } from "react";

type Props<T = string> = {
  className?: string;
  defaultValue?: T;
  options: OptionType<T>[];
  onChange?: (newValue: T) => void;
};

type OptionType<T = string> = {
  label: string;
  value: T;
};

const FilterButton = styled((props: Props) => {
  const { defaultValue, className, options, onChange } = props;
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSelect = (selectedOption: OptionType) => {
    setValue(selectedOption.value);
    handleClose();
    if (onChange) {
      onChange(selectedOption.value);
    }
  };

  return (
    <>
      <RootButton
        className={className}
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
      >
        {getOption(value, options)?.label}
      </RootButton>
      <Menu anchorEl={buttonRef.current} open={isOpen} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            selected={option.value === value}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
})({});

const getOption = function <T>(value: T, options: OptionType<T>[]) {
  return options.find((option) => option.value === value);
};

const RootButton = styled(
  forwardRef((props: ButtonProps, ref?: Ref<HTMLButtonElement>) => (
    <Button
      {...props}
      variant="outlined"
      color="black"
      endIcon={<IconArrowDown width={16} height={16} />}
      ref={ref}
    />
  )),
)(({ theme }) => ({
  ...theme.typography.text14,
  fontWeight: 400,
  borderRadius: 12,
  backgroundColor: theme.palette.custom.blue[1],
  borderColor: theme.palette.custom.blue[2],
  "&:hover": {
    backgroundColor: theme.palette.custom.blue[2],
    borderColor: theme.palette.custom.blue[3],
  },
}));

export default FilterButton;
