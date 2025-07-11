import { Heading, Container, Link } from "@react-email/components";
import * as React from "react";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Paragraph from "./components/Paragraph";

export default function IssuerRejectedAndClose() {
  const name = "{{.Name}}";
  const helpCenterUrl = "{{.HelpUrl}}";

  return (
    <Wrapper previewText={"Your account has been deleted"}>
      <Container className="w-full max-w-[632px] px-4 mb-20">
        <Header className="my-6" />
        <Heading
          as="h1"
          className="w-[500px] mx-auto text-center text-[24px] font-semibold text-dark-6 mb-10"
        >
          You account has been deleted
        </Heading>
        <Paragraph className="font-semibold">Dear {name}</Paragraph>
        <Paragraph>
          We hope this message finds you well. This email is to inform you that
          your account with has been officially deleted due to compliance with
          SHAHADAH's policies.
        </Paragraph>
        <ul>
          <li>
            <Paragraph>
              <b>Data and Certificates: </b>
              All data and certificates associated with your account have been
              securely removed from our platform. If you have any concerns or
              need further clarification about your data, please feel free to
              reach out to us
            </Paragraph>
          </li>
          <li>
            <Paragraph>
              <b>Reactivation: </b>
              Should you decide to engage with our platform again in the future,
              you will be required to create a new account.
            </Paragraph>
          </li>
        </ul>

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
