import NextHead from "next/head";

interface Props {
  title: string;
  description?: string;
}

export function Head({ title, description }: Props) {
  return (
    <NextHead>
      <title>{title}</title>
      {description ?? <meta name="description" content={description} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  );
}
