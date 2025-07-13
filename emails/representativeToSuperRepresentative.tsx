import { Heading, Section, Container, Link } from "@react-email/components";
import * as React from "react";
import Wrapper from "./components/Wrapper";
import Paragraph from "./components/Paragraph";
import ActionButton from "./components/ActionButton";
import IssuerHeader from "./components/IssuerHeader";

export default function RepresentativeToSuperRepresentative() {
  const inviter = "{{.Inviter}}";
  const inviterEmail = "{{.InviterEmail}}";
  const name = "{{.Name}}";
  const callback = "{{.Callback}}";

  return (
    <Wrapper previewText="You are now a Super Representative!">
      <Container className="w-full max-w-[632px] px-4 mb-20">
        <IssuerHeader className="mt-5 mb-10" />
        <Heading
          as="h1"
          className="w-[500px] mx-auto text-center text-[24px] font-semibold text-dark-6 mb-10"
        >
          You are now a Super Representative!
        </Heading>
        <Paragraph className="font-semibold">Dear {name}</Paragraph>
        <Paragraph className="mb-7">
          We're happy to inform you that you are now Super representative,
          effective immediately. This change grants you additional access to
          representative management page, allowing you to manage the platform
          more extensively.
        </Paragraph>
        <Section className="text-center mb-7">
          <ActionButton href={callback} className="bg-primary-issuer w-[248px]">
            Log in
          </ActionButton>
        </Section>
        <Paragraph>
          If you have any questions or need assistance, please don't hesitate to
          reach out to {inviter} at{" "}
          <Link href={`mailto:${inviterEmail}`} className="text-primary-issuer">
            {inviterEmail}
          </Link>
        </Paragraph>
        <Paragraph className="font-semibold mt-8">
          The Issuer Portal Team
        </Paragraph>
      </Container>
    </Wrapper>
  );
}
