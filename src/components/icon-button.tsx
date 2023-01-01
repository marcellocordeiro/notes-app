import { ActionIcon as BaseIconButton } from "@mantine/core";

type BaseIconButtonProps = React.ComponentProps<"button">;

export type IconButtonProps = {
  children: BaseIconButtonProps["children"];
  onClick?: BaseIconButtonProps["onClick"];
};

export const IconButton = ({ children, ...props }: IconButtonProps) => {
  return <BaseIconButton {...props}>{children}</BaseIconButton>;
};
