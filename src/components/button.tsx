import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from "@mantine/core";

const variants = {
  default: "blue",
  destructive: "red",
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
  variant = "default",
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
