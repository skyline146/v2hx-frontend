import { Flex, Button, MantineSize, ScrollArea } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { FC } from "react";

interface IFormProps {
  children: JSX.Element | JSX.Element[];
  onSave: () => void;
  loading?: boolean;
  closeModal?: () => void;
  w?: number | string;
  gap?: MantineSize | number;
}

export const Form: FC<IFormProps> = ({ children, onSave, loading, w, gap }: IFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
      style={{ width: w }}
    >
      <Flex gap={gap} direction="column">
        <ScrollArea
          scrollbarSize={8}
          scrollHideDelay={0}
          styles={{ scrollbar: { zIndex: 10 } }}
          mb={15}
        >
          <Flex gap={gap} direction="column" mah="70vh">
            {children}
          </Flex>
        </ScrollArea>
        <Flex>
          <Button
            w="100%"
            loading={loading}
            size="md"
            type="submit"
            leftSection={<IconDeviceFloppy />}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};
