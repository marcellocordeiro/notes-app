import { Text as MantineText } from "@mantine/core";

export interface TextProps {
  children: React.ReactNode;
}

export function Text({ children }: TextProps) {
  return <MantineText>{children}</MantineText>;
}
