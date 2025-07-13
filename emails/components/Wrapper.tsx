import React, { PropsWithChildren } from "react";
import {
  Html,
  Head,
  Font,
  Body,
  Preview,
  Tailwind,
} from "@react-email/components";
import { dark, blue, positive } from "../../src/theme/colors";

type Props = PropsWithChildren<{
  previewText?: string;
}>;

const Wrapper = ({ children, previewText }: Props) => {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Font
          fontFamily="Montserrat"
          fallbackFontFamily="Arial"
          fontWeight={400}
          fontStyle="normal"
        />
        {previewText && <Preview>{previewText}</Preview>}
      </Head>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: "#84A857",
                "primary-admin": "#2CA569",
                "primary-issuer": "#0E5AEE",
                "positive-1": positive[1],
                "positive-6": positive[6],
                "blue-2": blue[2],
                "dark-6": dark[6],
                "dark-10": dark[10],
              },
            },
          },
        }}
      >
        <Body className="bg-white">{children}</Body>
      </Tailwind>
    </Html>
  );
};

export default Wrapper;
