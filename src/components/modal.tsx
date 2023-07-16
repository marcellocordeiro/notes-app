import { Modal as MantineModal } from "@mantine/core";

export interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  return (
    <MantineModal title={title} opened={isOpen} onClose={onClose}>
      {children}
    </MantineModal>
  );
}
