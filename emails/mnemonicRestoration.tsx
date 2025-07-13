import {
  Text,
  Heading,
  Section,
  Container,
  Link,
  Img,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Paragraph from "./components/Paragraph";
import { COVER_2_URL, IDEA_ICON_URL } from "./utils/constants";

export default function MnemonicRestoration() {
  const name = "{{.Name}}";
  const getCodeNotation = (index) => `{{.Code${index}}}`;
  const numberOfColumn = 3;
  const numberOfRow = 4;
  const helpUrl = "{{.HelpUrl}}";

  return (
    <Wrapper previewText={"Verify your email address Global Blockchain Oasis"}>
      <Container className="w-full max-w-[632px] px-4 mb-20">
        <Header className="my-6" />
        <Img
          height={139}
          src={COVER_2_URL}
          className="mx-auto mb-6 rounded-[12px]"
        />
        <Heading
          as="h1"
          className="w-[500px] mx-auto text-center text-[24px] font-semibold text-dark-6 mb-10"
        >
          Your New Secret Recovery Phrase
          <br />
          Keep It Safe!
        </Heading>
        <Paragraph className="font-semibold">Dear {name}</Paragraph>
        <Paragraph>
          Your security is our top priority, and we are committed to ensuring
          that your account remains protected.
        </Paragraph>
        <Paragraph className="mb-6">
          It appears that you've requested to recover your GBO wallet’s Secret
          Recovery Phrase. You may find your 12-character Secret Recovery Phrase
          below
        </Paragraph>
        <Section className="border border-solid border-blue-2 rounded-[12px] h-[72px] w-full text-center p-10">
          {Array.from({ length: numberOfRow }, (_, rowIndex) => {
            return (
              <Row key={rowIndex}>
                {Array.from({ length: numberOfColumn }, (_, colIndex) => {
                  return (
                    <Column
                      style={{ width: `${1 / numberOfColumn}%` }}
                      key={colIndex}
                    >
                      <Text className="text-[14px] font-semibold text-dark-10">
                        {" "}
                        {getCodeNotation(rowIndex * 3 + colIndex)}
                      </Text>
                    </Column>
                  );
                })}
              </Row>
            );
          })}
        </Section>
        <Row className="mb-7 w-auto">
          <Column width={30}>
            <Img height={24} src={IDEA_ICON_URL} className="rounded-[12px]" />
          </Column>
          <Column>
            <Text className="text-[14px] text-blue-200">
              You may highlight all text and copy them
            </Text>
          </Column>
        </Row>
        <Paragraph>
          Please make sure to store it securely in a place known only to you.
          Never share it with anyone, and do not store it electronically where
          it could be compromised.
        </Paragraph>
        <Paragraph>
          If you did not request a new Secret Recovery Phrase or suspect any
          unauthorized activity on your account, please contact Help Center at{" "}
          <Link href={helpUrl} className="text-primary">
            {helpUrl}
          </Link>
        </Paragraph>
        <Paragraph>
          Thank you for choosing us as your trusted platform. We appreciate your
          commitment to keeping your account secure.
        </Paragraph>
        <Paragraph>Best regards,</Paragraph>
      </Container>
    </Wrapper>
  );
}
