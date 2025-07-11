import { Heading, Section, Container, Link } from "@react-email/components";
import * as React from "react";
import Wrapper from "./components/Wrapper";
import Paragraph from "./components/Paragraph";
import ActionButton from "./components/ActionButton";
import IssuerHeader from "./components/IssuerHeader";

export default function SuperRepresentativeToRepresentative() {
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
          You are now an Representative
        </Heading>
        <Paragraph className="font-semibold">Dear {name}</Paragraph>
        <Paragraph className="mb-7">
          We wanted to update you about a recent change to your role within the
          platform. You have been reassigned to the role of Representative from
          Super representative, you can no longer access the Representative
          management page.
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
