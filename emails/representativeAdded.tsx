import {
  Heading,
  Section,
  Container,
  Link,
  Img,
} from "@react-email/components";
import Wrapper from "./components/Wrapper";
import Paragraph from "./components/Paragraph";
import { COVER_1_URL } from "./utils/constants";
import ActionButton from "./components/ActionButton";
import IssuerHeader from "./components/IssuerHeader";

export default function RepresentativeAdded() {
  const companyName = "{{.CompanyName}}";
  const inviter = "{{.Inviter}}";
  const inviterEmail = "{{.InviterEmail}}";
  const name = "{{.Name}}";
  const callback = "{{.Callback}}";
  const helpCenterUrl = "{{.HelpUrl}}";
  const expireIn = "{{.ExpireIn}}" || "5 days";

  return (
    <Wrapper
      previewText={`You're invited to join ${companyName} as representative`}
    >
      <Container className="w-full max-w-[632px] px-4 mb-20">
        <IssuerHeader className="my-5" />
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
          You're invited to join {companyName} as representative
        </Heading>
        <Paragraph className="font-semibold">Dear {name}</Paragraph>
        <Paragraph>
          We're happy to inform you that you have been invited by {inviter} to
          become a representative! You can now access our issuance services.
        </Paragraph>
        <Paragraph className="mb-7">
          In the next {expireIn} days, proceed to create your account using the
          link below:
        </Paragraph>
        <Section className="text-center mb-7">
          <ActionButton href={callback} className="bg-primary-issuer w-[248px]">
            Get started
          </ActionButton>
        </Section>
        <Paragraph>
          If you have any questions or need assistance, please don't hesitate to
          reach out to {inviter} at{" "}
          <Link href={`mailto:${inviterEmail}`} className="text-primary-issuer">
            {inviterEmail}
          </Link>
          , or visit our Help Center at{" "}
          <Link href={helpCenterUrl} className="text-primary-issuer">
            {helpCenterUrl}
          </Link>
        </Paragraph>
        <Paragraph className="font-semibold mt-8">
          The Issuer Portal Team
        </Paragraph>
      </Container>
    </Wrapper>
  );
}
