import { Modal, Button } from "@mantine/core";
import { FC } from "react";

interface IModalButtonProps {
  children: JSX.Element;
  title: string;
  opened: boolean;
  open: () => void;
  close: () => void;
}

export const ModalButton: FC<IModalButtonProps> = ({
  title,
  children,
  open,
  close,
  opened,
}: IModalButtonProps) => {
  return (
    <>
      <Modal opened={opened} onClose={close} title={title} centered>
        {children}
      </Modal>

      <Button size="md" onClick={open}>
        {title}
      </Button>
    </>
  );
};
