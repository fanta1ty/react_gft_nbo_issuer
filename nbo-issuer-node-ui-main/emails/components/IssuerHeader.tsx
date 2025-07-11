import { twMerge } from "tailwind-merge";
import React from "react";
import { Section, Img } from "@react-email/components";
import { ISSUER_LOGO_URL } from "../utils/constants";

type Props = { className?: string };

const IssuerHeader = ({ className }: Props) => (
  <Section className={twMerge("text-center", className)}>
    <Img
      className="inline align-middle"
      width="35px"
      height="29px"
      src={ISSUER_LOGO_URL}
    />
  </Section>
);

export default IssuerHeader;
