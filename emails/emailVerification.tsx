import {
  Text,
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
import { COVER_1_URL } from "./utils/constants";

export default function CourseNomination() {
  const name = "{{.Name}}";
  const code = "{{.Code}}";
  const helpCenterUrl = "{{.HelpUrl}}";

  return (
    <Wrapper previewText={"Verify your email address Global Blockchain Oasis"}>
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
          Verify your email address
          <br />
          Global Blockchain Oasis
        </Heading>
        <Paragraph className="font-semibold">Dear {name}</Paragraph>
        <Paragraph>
          Your gateway to a world of opportunities in the blockchain ecosystem!
          We're thrilled to have you on board.
        </Paragraph>
        <Paragraph className="mb-6">
          To ensure the security of your account and provide you with the best
          experience, we need to verify your email address. Please use the
          following 6-character verification code to confirm your email:
        </Paragraph>
        <Section className="border border-solid border-blue-2 rounded-[12px] h-[72px] w-full text-center mb-7">
          <Text className="text-[24px] font-semibold text-dark-10 uppercase tracking-[0.4em]">
            {code}
          </Text>
        </Section>
        <Paragraph>
          Simply enter this code when prompted during the registration process,
          and your email will be successfully verified. If you didn't expect
          this email or if you have any concerns, please disregard it.
        </Paragraph>
        <Paragraph>
          If you have any questions or need assistance, visit our Help Center at{" "}
          <Link href={helpCenterUrl} className="text-primary">
            {helpCenterUrl}
          </Link>
        </Paragraph>
        <Paragraph>
          Thank you for choosing Global Blockchain Oasis. We look forward to
          embarking on this blockchain journey with you
        </Paragraph>
      </Container>
    </Wrapper>
  );
}
