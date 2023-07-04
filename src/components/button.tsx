import { Button as ButtonPrimitive } from "@mantine/core";

import type { ButtonProps as ButtonPrimitiveProps } from "@mantine/core";

const variants = {
  primary: "blue",
  danger: "red",
};

export interface ButtonProps {
  type?: ButtonPrimitiveProps["type"];
  className?: string;
  variant?: keyof typeof variants;
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  type = "button",
  className,
  variant = "primary",
  isLoading = false,
  children,
  onClick,
}: ButtonProps) {
  return (
    <ButtonPrimitive
      type={type}
      className={className}
      color={variants[variant]}
      loading={isLoading}
      onClick={onClick}
    >
      {children}
    </ButtonPrimitive>
  );
}
