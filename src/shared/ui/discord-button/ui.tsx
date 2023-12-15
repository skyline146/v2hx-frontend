import { ActionIcon } from "@mantine/core";

export const DiscordButton = ({ link, text }: { link: string; text?: string }) => {
  return (
    <a href={link} target="_blank">
      <ActionIcon size={32}>
        {text}
        <img src="/discord.svg" />
      </ActionIcon>
    </a>
  );
};
