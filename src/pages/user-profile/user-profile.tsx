import { Button, Flex, Title, Text } from "@mantine/core";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { UserProfileControls } from "widgets/user-profile-controls";
import { useUserStore } from "store";
import { SubcriptionText } from "entities/subscription-text";
import { ProtectedRender } from "entities/session";
import { useAuth } from "shared/lib/hooks";

export const UserProfile: FC = () => {
  const { username, admin, expire_date } = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Flex direction="column">
      <Flex justify="center" align="center" mb={50}>
        <Title size="h1" fw={700}>
          Welcome, {username}!
        </Title>
        <Button variant="default" ml={15} onClick={logout}>
          LOGOUT
        </Button>
      </Flex>
      <Flex justify="center">
        <Flex direction="column" w={300}>
          <UserProfileControls />
          <a href="/api/loader" target="_blank">
            <Button w="100%" mt={20} variant="default" size="md">
              Download V2HX Loader
            </Button>
          </a>
          <ProtectedRender admin={admin}>
            <Button mt={20} variant="default" size="md" onClick={() => navigate("/admin")}>
              Admin Panel
            </Button>
          </ProtectedRender>
        </Flex>
      </Flex>

      <Text size="xl" c="gray" fw={700} mt={20}>
        Subscription to:
      </Text>
      <SubcriptionText size="xl" expire_date={expire_date} />
    </Flex>
  );
};
