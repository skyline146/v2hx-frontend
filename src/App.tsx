import { MantineProvider, LoadingOverlay, createTheme } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import { useUserStore } from "./store";
import { UserProfile, AuthPage, AdminPanel } from "./pages";
import { ProtectedRoute } from "./components";
import { useIsLogged } from "./hooks";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import "./App.css";

function App() {
  const { loading } = useIsLogged();
  const user = useUserStore((state) => state.user);

  const theme = createTheme({
    primaryColor: "violet",
    focusRing: "never",
  });

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <LoadingOverlay
        visible={loading}
        overlayProps={{ radius: "sm", backgroundOpacity: 0.5 }}
        loaderProps={{ color: "blue", type: "dots", size: "xl" }}
      />
      <Notifications />
      <ModalsProvider>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route
            path="/admin"
            element={<ProtectedRoute admin={user.admin} element={<AdminPanel />} />}
          />
        </Routes>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
