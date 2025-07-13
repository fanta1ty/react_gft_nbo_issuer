import {
  Heading,
  Section,
  Container,
  Link,
  Text,
} from "@react-email/components";
import * as React from "react";
import Wrapper from "./components/Wrapper";
import Paragraph from "./components/Paragraph";
import IssuerHeader from "./components/IssuerHeader";

export default function RepresentativeBlacklisted() {
  const name = "{{.Name}}";
  const helpCenterUrl = "{{.HelpUrl}}";
  let action = "{{.Action}}";

  if (!action || action.length <= 0) {
    action = "No suggestion was provided";
  }

  return (
    <Wrapper previewText="Your Account Has Been Blacklisted">
      <Container className="w-full max-w-[632px] px-4 mb-20">
        <IssuerHeader className="mt-5 mb-10" />
        <Heading
          as="h1"
          className="w-[500px] mx-auto text-center text-[24px] font-semibold text-dark-6 mb-10"
        >
          Your Account Has Been Blacklisted
        </Heading>
        <Paragraph className="font-semibold">Dear {name}</Paragraph>
        <Paragraph className="mb-7">
          We regret to inform you that your representative account has been
          blacklisted. To remedy this situation, please note that you can do the
          following:
        </Paragraph>
        <Section className="border-2 border-solid border-positive-6 rounded-[12px] p-5 bg-positive-1 mb-8">
          <Text className="text-[14px] font-semibold text-dark-6 my-0 mb-3">
            Action needed
          </Text>
          <Paragraph className="mb-0">{action}</Paragraph>
        </Section>

        <Paragraph>
          If you believe this is an error or would like to discuss it further,
          please contact our support team at{" "}
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
