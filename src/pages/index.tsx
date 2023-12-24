import { Route, Routes, useNavigate } from "react-router-dom";
import { Title, Button, Flex, Text } from "@mantine/core";
import { FC } from "react";

import { ProtectedRoute } from "entities/session";
import { AdminPanel } from "./admin-panel";
import { AuthPage } from "./auth";
import { UserProfile } from "./user-profile";
import { useUserStore } from "store";
import { DiscordButton } from "shared/ui";

export const Routing: FC = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      {/* discord help button for all pages */}
      <Flex
        pos="fixed"
        bottom={10}
        left="50%"
        style={{ zIndex: 99, transform: "translateX(-50%)" }}
        align="center"
        display={location.pathname === "/admin" ? "none" : "block"}
      >
        <Text size="xl" fw={500} mr={10}>
          Need help?
        </Text>
        <DiscordButton link="https://discord.gg/8bDf3BdbYd" />
      </Flex>
      {/* routing for all available pages */}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute admin={user.admin}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Title size="h1" fw={700}>
                Page not found :(
              </Title>
              <Button mt={15} w={150} onClick={() => navigate("/profile")}>
                Go to profile
              </Button>
            </>
          }
        ></Route>
      </Routes>
    </>
  );
};
