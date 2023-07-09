import { createGetInitialProps } from "@mantine/next";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class Document extends NextDocument {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

/*
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
*/
