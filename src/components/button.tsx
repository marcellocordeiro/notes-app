import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from "@mantine/core";
import React, { forwardRef } from "react";

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

type Ref = React.ElementRef<typeof ButtonPrimitive>;

export const Button = forwardRef<Ref, ButtonProps>(
  (
    {
      type = "button",
      className,
      variant = "default",
      isLoading = false,
      children,
      onClick,
    },
    ref,
  ) => {
    return (
      <ButtonPrimitive
        ref={ref}
        type={type}
        className={className}
        color={variants[variant]}
        loading={isLoading}
        onClick={onClick}
      >
        {children}
      </ButtonPrimitive>
    );
  },
);

Button.displayName = "Button";
