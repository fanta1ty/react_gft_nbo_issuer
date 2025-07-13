import {
  Text,
  Heading,
  Section,
  Container,
  Img,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";
import ActionButton from "./components/ActionButton";
import Wrapper from "./components/Wrapper";
import Paragraph from "./components/Paragraph";
import {
  ARAMCO_LOGO_URL,
  COVER_1_URL,
  CERTIFICATE_THUMBNAIL_URL,
  USER_GROUP_URL,
} from "./utils/constants";

export default function CourseNomination() {
  const username = "{{.Username}}";
  const certificateName = "{{.CertificateName}}";
  const peopleCountStr = "{{.PeopleCountStr}}"; // 125 people have this | 1 person has this | ...
  const callback = "{{.Callback}}";
  const userGroupDisplay = "{{.UserGroupDisplay}}"; // none | inline-block

  return (
    <Wrapper previewText="You've Been Nominated for a Special Course Opportunity">
      <Container className="w-full max-w-[632px] px-4">
        <Img
          src={ARAMCO_LOGO_URL}
          width={106}
          height={60}
          className="mx-auto mb-5"
        />
        <Img
          width={362}
          height={139}
          src={COVER_1_URL}
          className="mx-auto mb-6 rounded-[12px]"
        />
        <Heading
          as="h1"
          className="w-[500px] mx-auto text-center text-[24px] font-semibold text-dark-6 mb-11"
        >
          You've Been Nominated for a Special Course Opportunity
        </Heading>
        <Text className="text-[14px] font-semibold text-dark-6">
          Dear {username}
        </Text>
        <Paragraph>
          We are excited to inform you that your dedication and potential have
          been recognized, Faisal has nominated you for an exclusive course
          opportunity on Aramco platform. This course has been handpicked to
          enhance your skills and knowledge, opening doors to new possibilities
          in your field.
        </Paragraph>
        <Section className="border border-solid border-blue-2 rounded-[12px] h-[72px] w-full mb-7 p-6">
          <Row>
            <Column width="106px">
              <Img
                className="block"
                width={94}
                height={73}
                alt="certificate"
                src={CERTIFICATE_THUMBNAIL_URL}
              />
            </Column>
            <Column>
              <Text className="text-[16px] font-semibold text-dark-6 my-0 mb-2">
                {certificateName}
              </Text>
              <div
                className="align-middle mr-1"
                style={{ display: userGroupDisplay }}
              >
                <Img
                  src={USER_GROUP_URL}
                  width={48}
                  height={24}
                  alt="user-group"
                />
              </div>
              <Text className="text-[14px] font-normal text-dark-6 inline-block my-0">
                {peopleCountStr}
              </Text>
            </Column>
          </Row>
        </Section>
        <Paragraph>
          To accept this nomination and confirm your participation, simply click
          here
        </Paragraph>
        <Section className="text-center mb-10">
          <ActionButton href={callback}>Accept Course Nomination</ActionButton>
        </Section>
        <Paragraph>
          We look forward to witnessing your continued success on the Aramco
          platform and beyond.
        </Paragraph>
        <Paragraph>
          If you have any questions or require further information, please don't
          hesitate to reach out to Faisal directly or contact Aramco support.
        </Paragraph>
      </Container>
    </Wrapper>
  );
}
