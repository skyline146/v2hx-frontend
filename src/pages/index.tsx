import { Route, Routes, useNavigate, Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Title, Button, Flex, Text, AppShell, Burger, Group, Box } from "@mantine/core";
import { FC } from "react";

import { ProtectedRoute, ProtectedRender } from "entities/session";
import { AdminPanel } from "./admin-panel";
import { AuthPage } from "./auth";
import { UserProfile } from "./user-profile";
import { HomePage } from "./home";

import { useUserStore } from "store";
import { ActionButton } from "shared/ui";

const Routing: FC = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <>
      {/* discord help button for all pages */}
      {/* <Flex
        pos="fixed"
        top={0}
        right={0}
        style={{ zIndex: 500 }}
        align="center"
        display={location.pathname === "/admin" ? "none" : "flex"}
      >
        <Text size="xl" fw={500} mr={10}>
          Need help?
        </Text>
        <ActionButton link="https://discord.gg/8bDf3BdbYd" img="/discord.svg" />
      </Flex> */}
      <AppShell
        h="100%"
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: true, mobile: !opened } }}
        // padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />
            <Group style={{ flex: 1 }} justify="space-between">
              <Link to="/" onClick={close}>
                <Flex align="center">
                  <img src="/logo.png" width={45} height={45} />
                  <Title c="violet" size="h1" fw={700} ml={5}>
                    V2HX
                  </Title>
                </Flex>
              </Link>

              <Group ml={20} gap={20} visibleFrom="sm">
                <Link to="/profile">
                  <Text size="lg" fw={500}>
                    Profile {user.username ? `(${user.username})` : null}
                  </Text>
                </Link>
                <ProtectedRender allowed={user.admin}>
                  <Link to="/admin">
                    <Text size="lg" fw={500}>
                      Admin Panel
                    </Text>
                  </Link>
                </ProtectedRender>
              </Group>

              <Flex align="center" visibleFrom="xs">
                <Text size="xl" fw={500} mr={10}>
                  Need help?
                </Text>
                <ActionButton link="https://discord.gg/8bDf3BdbYd" img="/discord.svg" />
              </Flex>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar py="md" px={4} zIndex={250}>
          <Flex direction="column" h="100%" justify="space-around">
            <Box>
              <Link to="/profile" onClick={close}>
                <Title size="h2" fw={700}>
                  Profile
                </Title>
              </Link>
              <ProtectedRender allowed={user.admin}>
                <Link to="/admin" onClick={close}>
                  <Title mt={20} size="h2" fw={700}>
                    Admin Panel
                  </Title>
                </Link>
              </ProtectedRender>
            </Box>

            <Flex justify="center">
              <Text size="xl" fw={500} mr={10}>
                Need help?
              </Text>
              <ActionButton link="https://discord.gg/8bDf3BdbYd" img="/discord.svg" />
            </Flex>
          </Flex>
        </AppShell.Navbar>

        <AppShell.Main mih="100%">
          {/* routing for all available pages */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={user.is_logged}>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAuthenticated={user.is_logged} adminOnly isAdmin={user.admin}>
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
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default Routing;
