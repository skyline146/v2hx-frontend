import { Flex, CopyButton, Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

export const credentialsModal = (username: string, password: string, textToCopy: string) =>
  modals.open({
    title: "New Account",
    centered: true,
    closeOnClickOutside: false,
    children: (
      <Flex direction="column" gap="sm">
        <Text fw={700} variant="gradient" gradient={{ from: "blue", to: "cyan", deg: 90 }}>
          Username: {username}
        </Text>
        <Text fw={700} variant="gradient" gradient={{ from: "blue", to: "cyan", deg: 90 }}>
          Password: {password}
        </Text>
        <CopyButton value={textToCopy}>
          {({ copied, copy }) => (
            <Button color={copied ? "teal" : "blue"} onClick={copy}>
              {copied ? "Copied!" : "Copy"}
            </Button>
          )}
        </CopyButton>
      </Flex>
    ),
  });
