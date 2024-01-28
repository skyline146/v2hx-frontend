import { Modal, Button, MantineColor, ButtonVariant, Flex } from "@mantine/core";
import { FC } from "react";

interface IModalButtonProps {
  children: JSX.Element;
  title: string;
  variant?: ButtonVariant;
  color?: MantineColor;
  size?: string;
  w?: string | number;
  disabled?: boolean;
  opened: boolean;
  open: () => void;
  close: () => void;
  icon?: React.ReactNode;
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
  disabled,
  icon,
}: IModalButtonProps) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Flex display="flex" align="center" gap="xs">
            {icon}
            {title}
          </Flex>
        }
        centered
        closeOnClickOutside={false}
      >
        {children}
      </Modal>

      <Button
        disabled={disabled}
        w={w}
        variant={variant}
        color={color}
        size={size ? size : "md"}
        onClick={open}
        leftSection={icon}
      >
        {title}
      </Button>
    </>
  );
};
