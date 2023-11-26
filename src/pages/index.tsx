import { Route, Routes } from "react-router-dom";
import { FC } from "react";

import { ProtectedRoute } from "entities/session";
import { AdminPanel } from "./admin-panel";
import { AuthPage } from "./auth";
import { UserProfile } from "./user-profile";
import { useUserStore } from "store";

export const Routing: FC = () => {
  const user = useUserStore((state) => state.user);

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
    </Routes>
  );
};
