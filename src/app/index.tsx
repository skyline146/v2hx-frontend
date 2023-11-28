import { MantineProvider, LoadingOverlay, createTheme } from "@mantine/core";
import { useEffect } from "react";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import { Routing } from "pages";
import { useAuth } from "shared/lib/hooks";

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
