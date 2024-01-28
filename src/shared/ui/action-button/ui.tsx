import { ActionIcon } from "@mantine/core";

export const ActionButton = ({
  link,
  text,
  icon,
  bg,
}: {
  link: string;
  bg?: string;
  text?: string;
  icon?: React.ReactNode;
}) => {
  return (
    <a href={link} target="_blank" style={{ width: 32, height: 32 }}>
      <ActionIcon bg={bg} size={32}>
        {text}
        {icon}
      </ActionIcon>
    </a>
  );
};
