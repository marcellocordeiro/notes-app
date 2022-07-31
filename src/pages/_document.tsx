import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

/*
import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="en">
    <Head>
      <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
    </Head>

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
*/
