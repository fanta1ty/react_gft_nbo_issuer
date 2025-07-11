import { Heading, Container, Link } from "@react-email/components";
import * as React from "react";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Paragraph from "./components/Paragraph";

export default function IssuerRejectedAndClose() {
  const name = "{{.Name}}";
  const helpCenterUrl = "{{.HelpUrl}}";

  return (
    <Wrapper previewText={"Your Issuer Application has been rejected!"}>
      <Container className="w-full max-w-[632px] px-4 mb-20">
        <Header className="my-6" />
        <Heading
          as="h1"
          className="w-[500px] mx-auto text-center text-[24px] font-semibold text-dark-6 mb-10"
        >
          Update on your Issuer Application
        </Heading>
        <Paragraph className="font-semibold">Dear {name}</Paragraph>
        <Paragraph>
          We are sorry to inform you that your application to access our digital
          certificate verification services has been rejected. At this time,
          your application will not be further considered. Thank you for taking
          the time to apply.
        </Paragraph>

        <Paragraph>
          If you believe this email was sent by mistake, please contact us at{" "}
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
