import { Button, Flex, Title, Text } from "@mantine/core";

import { AnimatedPage } from "pages/animated-page";
import { UserProfileControls } from "./user-profile-controls";
import { ServerPlayerlistControls } from "./server-playerlist-controls";
import { useUserStore } from "store";
import { SubcriptionText } from "entities/subscription-text";

export const UserProfile = () => {
  const { username, expire_date } = useUserStore((state) => state.user);

  return (
    <AnimatedPage>
      <Flex direction="column">
        <Flex justify="center" align="center" mb={20} wrap="wrap">
          <Title size="h2" fw={700}>
            Welcome, {username}!
          </Title>
        </Flex>
        <Flex justify="center">
          <Flex direction="column" w={300} gap="md">
            <UserProfileControls />
            <ServerPlayerlistControls />
            <a href="/api/loader" target="_blank">
              <Button w="100%" variant="default" size="md">
                Download V2HX Loader
              </Button>
            </a>
          </Flex>
        </Flex>

        <Text size="xl" c="gray" fw={700} mt={20}>
          Subscription to:
        </Text>
        <SubcriptionText size="xl" expire_date={expire_date} />
      </Flex>
    </AnimatedPage>
  );
};
