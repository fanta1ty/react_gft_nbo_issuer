import {
  Heading,
  Section,
  Container,
  Link,
  Text,
} from "@react-email/components";
import * as React from "react";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Paragraph from "./components/Paragraph";
import ActionButton from "./components/ActionButton";

export default function EmployerRejected() {
  const name = "{{.Name}}";
  const helpCenterUrl = "{{.HelpUrl}}";
  const callback = "{{.Callback}}";
  let action = "{{.Action}}";

  if (!action || action.length <= 0) {
    action = "No suggestion was provided";
  }

  return (
    <Wrapper previewText={"Your Employer Application has been rejected!"}>
      <Container className="w-full max-w-[632px] px-4 mb-20">
        <Header className="my-6" />
        <Heading
          as="h1"
          className="w-[500px] mx-auto text-center text-[24px] font-semibold text-dark-6 mb-10"
        >
          Update your Employer application
        </Heading>
        <Paragraph className="font-semibold">Dear {name}</Paragraph>
        <Paragraph>
          We are sorry to inform you that your application has been rejected and
          we request you update your application. Please consider the
          suggestions below and re-submit your application.
        </Paragraph>
        <Section className="border-2 border-solid border-positive-6 rounded-[12px] p-5 bg-positive-1 mb-8">
          <Text className="text-[14px] font-semibold text-dark-6 my-0 mb-3">
            Action required
          </Text>
          <Paragraph className="mb-0">{action}</Paragraph>
        </Section>
        <Section className="text-center mb-10">
          <ActionButton href={callback} className="bg-primary-admin">
            Update your application
          </ActionButton>
        </Section>
        <Paragraph>
          If you believe this is an error or would like to discuss it further,
          please contact our support team at{" "}
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
