import { Route, Routes, useNavigate } from "react-router-dom";
import { Title, Button } from "@mantine/core";
import { FC } from "react";

import { ProtectedRoute } from "entities/session";
import { AdminPanel } from "./admin-panel";
import { AuthPage } from "./auth";
import { UserProfile } from "./user-profile";
import { useUserStore } from "store";

export const Routing: FC = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  return (
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
  );
};
