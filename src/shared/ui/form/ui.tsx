import { Flex, Box, Button } from "@mantine/core";
import { FC } from "react";

interface IFormProps {
  children: JSX.Element | JSX.Element[];
  onSave: () => void;
  loading?: boolean;
  closeModal?: () => void;
  w?: number | string;
  gap?: string;
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
      <Flex w={w} gap={gap} direction="column">
        {children}
        <Box mt={15} w={150} style={{ alignSelf: "center" }}>
          <Button loading={loading} type="submit" w="100%">
            Save
          </Button>
        </Box>
      </Flex>
    </form>
  );
};
