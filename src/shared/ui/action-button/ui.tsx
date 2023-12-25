import { ActionIcon } from "@mantine/core";

export const ActionButton = ({
  link,
  text,
  img,
}: {
  link: string;
  text?: string;
  img?: string;
}) => {
  return (
    <a href={link} target="_blank">
      <ActionIcon size={32}>
        {text}
        <img src={img} />
      </ActionIcon>
    </a>
  );
};
