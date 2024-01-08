import { ActionIcon } from "@mantine/core";

export const ActionButton = ({
  link,
  text,
  img,
  bg,
}: {
  link: string;
  bg?: string;
  text?: string;
  img?: string;
}) => {
  return (
    <a href={link} target="_blank">
      <ActionIcon bg={bg} size={32}>
        {text}
        <img src={img} />
      </ActionIcon>
    </a>
  );
};
