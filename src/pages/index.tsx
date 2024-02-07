import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import {
  Title,
  Button,
  Flex,
  Text,
  AppShell,
  Burger,
  Group,
  Box,
  Image,
  Card,
} from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { IconLogout, IconUserCircle, IconSettings } from "@tabler/icons-react";

import { ProtectedRoute, ProtectedRender } from "entities/session";
import { AdminPanel } from "./admin-panel";
import { AuthPage } from "./auth";
import { UserProfile } from "./user-profile";
import { HomePage } from "./home";

import { useUserStore } from "store";
import { ActionButton, NavLink } from "shared/ui";
import { useAuth } from "shared/lib/hooks";
import { FeaturesList } from "shared/lib/types";

const Routing: FC = () => {
  const user = useUserStore((state) => state.user);
  const { logout } = useAuth();
  const [featuresData, setFeaturesData] = useState<FeaturesList | null>(null);
  const [visibleZ, setVisibleZ] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [openedNavbar, { toggle: toggleNavbar, close: closeNavbar }] = useDisclosure();

  useEffect(() => {
    async function fetchFeatures() {
      const data = await fetch("/features.json").then((res) => res.json());

      setFeaturesData(data);
    }

    fetchFeatures();
  }, []);

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
                <img src="/favicon.png" width={45} height={45} />
                <Title size="h1" fw={700} ml={5}>
                  V2HX
                </Title>
              </Flex>
            </NavLink>

            <Group ml={20} gap={20} visibleFrom="sm">
              <NavLink to="/profile" icon={<IconUserCircle />}>
                <Text size="xl" fw={500}>
                  Profile {user.username ? `(${user.username})` : null}
                </Text>
              </NavLink>
              <ProtectedRender allowed={user.admin}>
                <NavLink to="/admin" icon={<IconSettings />}>
                  <Text size="xl" fw={500}>
                    Admin Panel
                  </Text>
                </NavLink>
              </ProtectedRender>
              <ProtectedRender allowed={user.is_authenticated}>
                <Button variant="default" onClick={logout} leftSection={<IconLogout />}>
                  Log Out
                </Button>
              </ProtectedRender>
            </Group>

            <Flex align="center" visibleFrom="xs">
              <Text size="xl" fw={500} mr={10}>
                Need help?
              </Text>
              <ActionButton
                link="https://discord.gg/8bDf3BdbYd"
                icon={<Image src="/discord.svg" />}
              />
            </Flex>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4} zIndex={250}>
        <Flex direction="column" h="100%" align="center" justify="space-around">
          <Flex direction="column" gap="lg">
            <NavLink to="/profile" icon={<IconUserCircle size={40} />} onClick={closeNavbar}>
              <Title size="h1" fw={500}>
                Profile {user.username ? `(${user.username})` : null}
              </Title>
            </NavLink>
            <ProtectedRender allowed={user.admin}>
              <NavLink to="/admin" icon={<IconSettings size={40} />} onClick={closeNavbar}>
                <Title size="h1" fw={500}>
                  Admin Panel
                </Title>
              </NavLink>
            </ProtectedRender>
          </Flex>

          <ProtectedRender allowed={user.is_authenticated}>
            <Button
              // w="50%"
              size="xl"
              variant="default"
              ml={15}
              onClick={() => {
                logout();
                closeNavbar();
              }}
              leftSection={<IconLogout />}
            >
              Log Out
            </Button>
          </ProtectedRender>

          <Flex justify="center">
            <Text size="xl" fw={500} mr={10}>
              Need help?
            </Text>
            <ActionButton
              link="https://discord.gg/8bDf3BdbYd"
              icon={<Image src="/discord.svg" />}
            />
          </Flex>
        </Flex>
      </AppShell.Navbar>

      <AppShell.Main mih="100%">
        {/* routing for all available pages */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage featuresData={featuresData} />} />
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
                    Page not found 🤕
                  </Title>
                  <Button mt={15} w={150} onClick={() => navigate("/profile")}>
                    Go to profile
                  </Button>
                </>
              }
            />
          </Routes>
        </AnimatePresence>
        <Card
          display={visibleZ ? "block" : "none"}
          shadow="lg"
          withBorder
          w="100vw"
          h="100vh"
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 201,
          }}
        >
          <Text fw={500} fz={600} style={{ lineHeight: 1, padding: 0, margin: 0 }}>
            Z
          </Text>
        </Card>
        <Box
          onMouseEnter={() => setVisibleZ(true)}
          onMouseLeave={() => setVisibleZ(false)}
          style={{
            position: "fixed",
            right: 0,
            bottom: 0,
            zIndex: 202,
          }}
        >
          💤
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};

export default Routing;
