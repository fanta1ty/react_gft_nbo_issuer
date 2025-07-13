import * as React from "react";
import { Container, Heading } from "@react-email/components";
import Wrapper from "./components/Wrapper";

export default function Email() {
  return (
    <Wrapper>
      <Container style={{ border: "1px solid black" }}>
        <Heading as="h1">%%the_title%%</Heading>
      </Container>
    </Wrapper>
  );
}
