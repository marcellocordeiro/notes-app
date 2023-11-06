import { Button as MantineButton } from "@mantine/core";

import type { ButtonProps as MantineButtonProps } from "@mantine/core";

const variants = {
  primary: "blue",
  danger: "red",
};

export type ButtonProps = {
  type?: "submit" | "button";
  variant?: keyof typeof variants;
  fullWidth?: boolean;
  mt?: MantineButtonProps["mt"];
  isLoading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export function Button({
  type = "button",
  variant = "primary",
  fullWidth = false,
  mt,
  isLoading = false,
  onClick,
  children,
}: ButtonProps) {
  return (
    <MantineButton
      type={type}
      color={variants[variant]}
      fullWidth={fullWidth}
      mt={mt}
      loading={isLoading}
      onClick={onClick}
    >
      {children}
    </MantineButton>
  );
}
