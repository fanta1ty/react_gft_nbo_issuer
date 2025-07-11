import { Heading, Section, Container, Link } from "@react-email/components";
import * as React from "react";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Paragraph from "./components/Paragraph";
import ActionButton from "./components/ActionButton";

export default function IssuerRejected() {
  const name = "{{.Name}}";
  const helpCenterUrl = "{{.HelpUrl}}";
  const callback = "{{.Callback}}";

  return (
    <Wrapper previewText={"Your Account has been whitelisted"}>
      <Container className="w-full max-w-[632px] px-4 mb-20">
        <Header className="my-6" />
        <Heading
          as="h1"
          className="w-[500px] mx-auto text-center text-[24px] font-semibold text-dark-6 mb-10"
        >
          Your Account has been whitelisted
        </Heading>
        <Paragraph className="font-semibold">Dear {name}</Paragraph>
        <Paragraph>
          We're happy to inform you that your Issuer account has been
          whitelisted! You can now regain access to your account. All
          representatives accounts have been restored. You can now verify
          digital certificates again.
        </Paragraph>
        <Paragraph>
          Please proceed to log in to your account using the link below:
        </Paragraph>
        <Section className="text-center my-7">
          <ActionButton href={callback} className="bg-primary-admin">
            Login now
          </ActionButton>
        </Section>
        <Paragraph>
          We greatly appreciate your prompt attention to resolving the concerns
          that led to your account's blacklisting. If you have any questions or
          need assistance, visit our Help Center at{" "}
          <Link href={helpCenterUrl} className="text-primary">
            {helpCenterUrl}
          </Link>
          .
        </Paragraph>
        <Paragraph className="mt-7">
          Best regards,
          <br />
          The SHAHADAH Team
        </Paragraph>
      </Container>
    </Wrapper>
  );
}
