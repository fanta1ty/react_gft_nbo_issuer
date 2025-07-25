import Wrapper from "./components/Wrapper";
import {
  Heading,
  Section,
  Container,
  Link,
  Img,
} from "@react-email/components";
import IssuerHeader from "./components/IssuerHeader";
import Paragraph from "./components/Paragraph";
import { COVER_1_URL } from "./utils/constants";

export default function issuerApplicationInReview() {
  const name = "{{.Name}}";
  const helpCenterUrl = "{{.HelpUrl}}";

  return (
    <Wrapper previewText={"Your Employer Application has been approved!"}>
      <Container>
        <IssuerHeader className="mt-5 mb-10" />
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
          Your Application to Become an Issuer Has Been Received
        </Heading>
        <Paragraph className="font-semibold">Dear {name}</Paragraph>
        <Paragraph className="mb-8">
          Thank you for registering to our digital certificate issuance
          services. Your registration has successfully been received and your
          application is now reviewed by our team. Once the review is complete,
          we will send you a confirmation email and grant you full access to our
          verification services, allowing you to assign digital certificates. We
          appreciate your patience during this brief waiting period. If you have
          any question or require assistance during this process, our dedicated
          support team is here to provide the required guidance.
        </Paragraph>
        <Paragraph>
          Please reach out to us at{" "}
          <Link href={helpCenterUrl} className="text-primary-issuer">
            {helpCenterUrl}
          </Link>
          . We look forward to supporting your organization's growth and
          success.
        </Paragraph>
        <Paragraph className="font-semibold mt-8">
          The Issuer Portal Team
        </Paragraph>
      </Container>
    </Wrapper>
  );
}
