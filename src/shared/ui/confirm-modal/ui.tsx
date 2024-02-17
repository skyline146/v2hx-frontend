import { Button, MantineColor, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

interface IConfirmModalProps {
  title: string;
  confirmColor?: MantineColor;
  confirmLabel?: string;
  disabled?: boolean;
  onConfirm: () => void;
}

export const ConfirmModal = ({
  title,
  confirmColor,
  confirmLabel = "Confirm",
  disabled,
  onConfirm,
}: IConfirmModalProps) => {
  const openModal = () =>
    modals.openConfirmModal({
      title: (
        <Text fw={500} size="xl">
          {title}?
        </Text>
      ),
      centered: true,
      //   children: <Text size="md">Please confirm to complete your action.</Text>,
      labels: { confirm: confirmLabel, cancel: "Cancel" },
      groupProps: { justify: "center" },
      confirmProps: { color: confirmColor },
      onConfirm,
    });

  return (
    <Button disabled={disabled} color={confirmColor} onClick={openModal}>
      {title}
    </Button>
  );
};
