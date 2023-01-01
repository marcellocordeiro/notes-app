import { Button as BaseButton } from "@mantine/core";

const variants = {
  primary: "blue",
  danger: "red",
};

type BaseButtonProps = React.ComponentProps<"button">;

export type ButtonProps = {
  variant?: keyof typeof variants;
  loading?: boolean;
  type?: BaseButtonProps["type"];
  children: BaseButtonProps["children"];
  onClick?: BaseButtonProps["onClick"];
};

export const Button = ({
  variant = "primary",
  children,
  ...props
}: ButtonProps) => {
  return (
    <BaseButton color={variants[variant]} {...props}>
      {children}
    </BaseButton>
  );
};
