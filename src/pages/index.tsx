import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Title, Button, Flex, Text, AppShell, Burger, Group, Box } from "@mantine/core";
import { FC } from "react";
import { AnimatePresence } from "framer-motion";

import { ProtectedRoute, ProtectedRender } from "entities/session";
import { AdminPanel } from "./admin-panel";
import { AuthPage } from "./auth";
import { UserProfile } from "./user-profile";
import { HomePage } from "./home";

import { useUserStore } from "store";
import { ActionButton, NavLink } from "shared/ui";
import { useAuth } from "shared/lib/hooks";

const Routing: FC = () => {
  const user = useUserStore((state) => state.user);
  const { logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [openedNavbar, { toggle: toggleNavbar, close: closeNavbar }] = useDisclosure();

  return (
    <AppShell
      h="100%"
      header={{ height: 55 }}
      navbar={{ width: 500, breakpoint: "sm", collapsed: { desktop: true, mobile: !openedNavbar } }}
      // padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={openedNavbar} onClick={toggleNavbar} hiddenFrom="sm" size="md" />
          <Group style={{ flex: 1 }} justify="space-between">
            <NavLink to="/" onClick={closeNavbar}>
              <Flex align="center">
                <img src="/logo.png" width={45} height={45} />
                <Title size="h1" fw={700} ml={5}>
                  V2HX
                </Title>
              </Flex>
            </NavLink>

            <Group ml={20} gap={20} visibleFrom="sm">
              <NavLink to="/profile">
                <Text size="xl" fw={500}>
                  Profile {user.username ? `(${user.username})` : null}
                </Text>
              </NavLink>
              <ProtectedRender allowed={user.admin}>
                <NavLink to="/admin">
                  <Text size="xl" fw={500}>
                    Admin Panel
                  </Text>
                </NavLink>
              </ProtectedRender>
              <ProtectedRender allowed={user.is_authenticated}>
                <Button variant="default" onClick={logout}>
                  LOGOUT
                </Button>
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
        <Flex direction="column" h="100%" align="center" justify="space-around">
          <Box>
            <NavLink to="/profile" onClick={closeNavbar}>
              <Title size="h2" fw={700}>
                Profile {user.username ? `(${user.username})` : null}
              </Title>
            </NavLink>
            <ProtectedRender allowed={user.admin}>
              <NavLink to="/admin" onClick={closeNavbar}>
                <Title mt={20} size="h2" fw={700}>
                  Admin Panel
                </Title>
              </NavLink>
            </ProtectedRender>
          </Box>

          <ProtectedRender allowed={user.is_authenticated}>
            <Button
              w="50%"
              variant="default"
              ml={15}
              onClick={() => {
                logout();
                closeNavbar();
              }}
            >
              LOGOUT
            </Button>
          </ProtectedRender>

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
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly isAdmin={user.admin}>
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
            />
          </Routes>
        </AnimatePresence>
      </AppShell.Main>
    </AppShell>
  );
};

export default Routing;
