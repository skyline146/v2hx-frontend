import { MantineProvider, LoadingOverlay, createTheme, Flex, Text } from "@mantine/core";
import { useEffect } from "react";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import { Routing } from "pages";
import { useAuth } from "shared/lib/hooks";
import { DiscordButton } from "shared/ui";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import "./index.css";

function App() {
  const { loading, isLogged } = useAuth();

  const theme = createTheme({
    primaryColor: "violet",
    focusRing: "never",
  });

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Flex
        pos="fixed"
        bottom={10}
        left="50%"
        style={{ zIndex: 99, transform: "translateX(-50%)" }}
        align="center"
      >
        <Text size="xl" fw={500} mr={10}>
          Need help?
        </Text>
        <DiscordButton link="https://discord.gg/8bDf3BdbYd" />
      </Flex>

      <LoadingOverlay
        visible={loading}
        overlayProps={{ radius: "sm", backgroundOpacity: 0.5 }}
        loaderProps={{ color: "blue", type: "dots", size: "xl" }}
      />
      <Notifications />
      <ModalsProvider>
        <Routing />
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
