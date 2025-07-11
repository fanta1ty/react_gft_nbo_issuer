import {
  Heading,
  Section,
  Container,
  Link,
  Img,
} from "@react-email/components";
import * as React from "react";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Paragraph from "./components/Paragraph";
import ActionButton from "./components/ActionButton";
import { COVER_1_URL } from "./utils/constants";

export default function EmployerApproved() {
  const name = "{{.Name}}";
  const helpCenterUrl = "{{.HelpUrl}}";
  const callback = "{{.Callback}}";

  return (
    <Wrapper previewText={"Your Employer Application has been approved!"}>
      <Container className="w-full max-w-[632px] px-4 mb-20">
        <Header className="my-6" />
        <Img
          width={362}
          height={139}
          src={COVER_1_URL}
          className="mx-auto mb-6 rounded-[12px]"
        />
        <Heading
          as="h1"
          className="w-[500px] mx-auto text-center text-[24px] font-semibold text-dark-6 mb-10"
        >
          Your Employer Application has been approved!
        </Heading>
        <Paragraph className="font-semibold">Hello {name}</Paragraph>
        <Paragraph>
          We are pleased to inform you that your application has been approved.
          You can now use all our digital certificate verification services.
          Please proceed to log in to your account using the button below
        </Paragraph>
        <Section className="text-center mb-10">
          <ActionButton href={callback} className="bg-primary-admin">
            Login now
          </ActionButton>
        </Section>
        <Paragraph>
          Start verifying certificates: Verify job applicants credentials and
          qualifications with secure digital certificates. No paperwork
          required.
        </Paragraph>
        <Paragraph>
          If you have any questions or need assistance, visit our Help Center at{" "}
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
