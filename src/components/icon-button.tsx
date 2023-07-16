import { ActionIcon as MantineIconButton } from "@mantine/core";

export interface IconButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export function IconButton({ onClick, children }: IconButtonProps) {
  return <MantineIconButton onClick={onClick}>{children}</MantineIconButton>;
}
