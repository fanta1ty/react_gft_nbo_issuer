import React from "react";
import { twMerge } from "tailwind-merge";
import { Button, type ButtonProps } from "@react-email/button";

const ActionButton = ({ className, ...buttonProps }: ButtonProps) => {
  return (
    <Button
      {...buttonProps}
      className={twMerge(
        "relative bg-primary box-border select-none align-middle font-semibold text-base leading-7 px-10 py-4 cursor-pointer no-underline text-white shadow-md rounded-full",
        className,
      )}
    />
  );
};

export default ActionButton;
