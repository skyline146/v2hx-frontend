import { MantineProvider, LoadingOverlay } from "@mantine/core";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import api from "./api";
import { useUserStore } from "./store";
import { UserProfile, AuthPage, AdminPanel } from "./pages";
import { ProtectedRoute } from "./components";

import { API_URLS } from "./helpers/enums";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    api
      .get(API_URLS.IS_LOGGED)
      .then((res) => {
        const { username, admin, expire_date } = res.data;
        const userData = {
          username,
          admin,
          expire_date,
        };
        setUser(userData);
      })
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MantineProvider defaultColorScheme="dark">
      <LoadingOverlay
        visible={loading}
        overlayProps={{ radius: "sm", backgroundOpacity: 1 }}
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
