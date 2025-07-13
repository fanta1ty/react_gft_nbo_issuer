import { Heading, Container, Link } from "@react-email/components";
import * as React from "react";
import Wrapper from "./components/Wrapper";
import Paragraph from "./components/Paragraph";
import IssuerHeader from "./components/IssuerHeader";

export default function RepresentativeDeleted() {
  const name = "{{.Name}}";
  const helpCenterUrl = "{{.HelpUrl}}";

  return (
    <Wrapper previewText="Your account has been deleted">
      <Container className="w-full max-w-[632px] px-4 mb-20">
        <IssuerHeader className="mt-5 mb-10" />
        <Heading
          as="h1"
          className="w-[500px] mx-auto text-center text-[24px] font-semibold text-dark-6 mb-10"
        >
          Your account has been deleted
        </Heading>
        <Paragraph className="font-semibold">Dear {name}</Paragraph>
        <Paragraph className="mb-8">
          We regret to inform you that your representative account has been
          deleted. We hope you enjoyed the services while you had access to
          them.
        </Paragraph>
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
