import { twMerge } from "tailwind-merge";
import React from "react";
import { Section, Text, Img } from "@react-email/components";
import { GBO_LOGO_URL } from "../utils/constants";

type Props = { className?: string };

const Header = ({ className }: Props) => (
  <Section className={twMerge("text-center", className)}>
    <Text className="text-[12px] font-normal text-dark-6 my-0">
      <Img
        className="inline align-middle"
        width="48px"
        height="48px"
        src={GBO_LOGO_URL}
      />{" "}
      SHAHADAH
    </Text>
  </Section>
);

export default Header;
