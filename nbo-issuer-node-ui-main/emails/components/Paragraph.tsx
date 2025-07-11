import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { Text } from "@react-email/components";

type Props = PropsWithChildren<{
  className?: string;
}>;

const Paragraph = ({ children, className }: Props) => {
  return (
    <Text
      className={twMerge("text-[14px] font-normal text-dark-6 my-3", className)}
    >
      {children}
    </Text>
  );
};

export default Paragraph;
