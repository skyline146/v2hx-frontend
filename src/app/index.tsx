import { MantineProvider, LoadingOverlay, createTheme } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

import Pages from "pages";
import { useAuth } from "shared/lib/hooks";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";

import "./index.css";

function App() {
  const { isLogged } = useAuth();
  const [loading, setLoading] = useState(true);
  const { current: requestedLocation } = useRef(location.pathname);
  const navigate = useNavigate();

  const theme = createTheme({
    primaryColor: "violet",
    focusRing: "never",
  });

  useEffect(() => {
    isLogged()
      .then(() => {
        if (location.pathname === "/login") {
          navigate(requestedLocation === "/login" ? "/profile" : requestedLocation);
        }
      })
      .finally(() => setLoading(false));
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
        <Pages />
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
