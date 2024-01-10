import { Modal, Button, MantineColor, ButtonVariant } from "@mantine/core";
import { FC } from "react";

interface IModalButtonProps {
  children: JSX.Element;
  title: string;
  variant?: ButtonVariant;
  color?: MantineColor;
  size?: string;
  w?: string | number;
  opened: boolean;
  open: () => void;
  close: () => void;
}

export const ModalButton: FC<IModalButtonProps> = ({
  title,
  children,
  variant,
  open,
  close,
  opened,
  size,
  color,
  w,
}: IModalButtonProps) => {
  return (
    <>
      <Modal opened={opened} onClose={close} title={title} centered>
        {children}
      </Modal>

      <Button w={w} variant={variant} color={color} size={size ? size : "md"} onClick={open}>
        {title}
      </Button>
    </>
  );
};
