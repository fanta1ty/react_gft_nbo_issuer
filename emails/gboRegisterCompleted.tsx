import { Heading, Container, Link, Img } from "@react-email/components";
import * as React from "react";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Paragraph from "./components/Paragraph";
import { COVER_1_URL } from "./utils/constants";

export default function Email() {
  const name = "{{.FullName}}";
  const helpCenterUrl = "{{.HelpUrl}}";

  return (
    <Wrapper
      previewText={
        "Congratulations on successfully registering with Global Blockchain Oasis!"
      }
    >
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
          className="w-[520px] mx-auto text-center text-[24px] font-semibold text-dark-6 mb-10"
        >
          Congratulations on successfully registering with Global Blockchain
          Oasis!
        </Heading>
        <Paragraph className="font-semibold">Dear {name}</Paragraph>
        <Paragraph className="mb-7">
          We're thrilled to welcome you to the Global Blockchain Oasis! Your
          registration is now complete, and you're all set to explore the
          exciting world of blockchain technology with us. To get started,
          simply log in to your Global Blockchain Oasis extension and you can
          look forward to:
        </Paragraph>
        <Paragraph>
          <b>Access to Cutting-Edge Insights:</b> Stay up-to-date with the
          latest trends, news, and developments in blockchain technology.
        </Paragraph>
        <Paragraph>
          <b>Learning Opportunities: </b> Explore a wide range of courses,
          webinars, and resources to expand your blockchain knowledge.
        </Paragraph>
        <Paragraph>
          <b>Networking:</b> Connect with like-minded professionals, experts,
          and enthusiasts in the blockchain space.
        </Paragraph>
        <Paragraph className="mb-7">
          <b>Career Advancement:</b> Discover job opportunities and take your
          career to new heights in the blockchain industry.
        </Paragraph>
        <Paragraph className="mb-7">
          If you have any questions or need assistance, visit our Help Center at{" "}
          <Link href={helpCenterUrl} className="text-primary">
            {helpCenterUrl}
          </Link>
          .
        </Paragraph>
        <Paragraph></Paragraph>
        <Paragraph>
          Best regards,
          <br />
          The Global Blockchain Oasis Team
        </Paragraph>
      </Container>
    </Wrapper>
  );
}
