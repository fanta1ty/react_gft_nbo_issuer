import { Heading, Section, Container, Link } from "@react-email/components";
import * as React from "react";
import Wrapper from "./components/Wrapper";
import Paragraph from "./components/Paragraph";
import IssuerHeader from "./components/IssuerHeader";
import ActionButton from "./components/ActionButton";

export default function RepresentativeWhitelisted() {
  const name = "{{.Name}}";
  const callback = "{{.Callback}}";
  const helpCenterUrl = "{{.HelpUrl}}";

  return (
    <Wrapper previewText="Your account has been Whitelisted!">
      <Container className="w-full max-w-[632px] px-4 mb-20">
        <IssuerHeader className="mt-5 mb-10" />
        <Heading
          as="h1"
          className="w-[500px] mx-auto text-center text-[24px] font-semibold text-dark-6 mb-10"
        >
          Your account has been Whitelisted!
        </Heading>
        <Paragraph className="font-semibold">Dear {name}</Paragraph>
        <Paragraph className="mb-7">
          We're happy to inform you that your representative account has been
          whitelisted! You can now regain access to your account. Please proceed
          to log in to your account using the button below
        </Paragraph>
        <Section className="text-center mb-7">
          <ActionButton href={callback} className="bg-primary-issuer w-[248px]">
            Login now
          </ActionButton>
        </Section>
        <Paragraph>
          If you have any questions or need assistance, please don't hesitate to
          reach out to our support team at{" "}
          <Link href={helpCenterUrl} className="text-primary-issuer">
            {helpCenterUrl}
          </Link>
          .
        </Paragraph>
        <Paragraph className="font-semibold mt-8">
          The Issuer Portal Team
        </Paragraph>
      </Container>
    </Wrapper>
  );
}
