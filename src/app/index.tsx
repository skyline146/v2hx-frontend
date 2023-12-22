import { MantineProvider, LoadingOverlay, createTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import { Routing } from "pages";
import { useAuth } from "shared/lib/hooks";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import "./index.css";

function App() {
  const { isLogged } = useAuth();
  const [loading, setLoading] = useState(true);

  const theme = createTheme({
    primaryColor: "violet",
    focusRing: "never",
  });

  useEffect(() => {
    isLogged().finally(() => setLoading(false));
  }, []);

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <LoadingOverlay
        visible={loading}
        overlayProps={{ radius: "sm", backgroundOpacity: 1 }}
        loaderProps={{ type: "oval", size: "xl" }}
      />
      <Notifications />
      <ModalsProvider>
        <Routing />
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
