import { Modal as BaseModal } from "@mantine/core";

export type ModalProps = {
  title: string;
  description?: string;
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ ...props }: ModalProps) => {
  return <BaseModal {...props} />;
};
