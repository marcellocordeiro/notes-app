import { Text as BaseText } from "@mantine/core";

export type TextProps = {
  children?: React.ReactNode;
};

export function Text({ ...props }: TextProps) {
  return <BaseText {...props} />;
}
