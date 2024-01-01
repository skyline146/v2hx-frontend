import { Title, Button } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store";

interface IProtectedRoute {
  adminOnly?: boolean;
  isAdmin?: boolean;
  children: JSX.Element;
}

export const ProtectedRoute = ({ children, adminOnly, isAdmin }: IProtectedRoute) => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.is_authenticating) return;
    if (!user.is_authenticated) navigate("/login");
  }, [user.is_authenticated, user.is_authenticating, navigate]);

  if (adminOnly && !isAdmin) {
    return (
      <>
        <Title size="h1" fw={700}>
          You don't have access to this page.
        </Title>
        <Button mt={15} w={150} onClick={() => navigate("/profile")}>
          Go to profile
        </Button>
      </>
    );
  }

  return user.is_authenticated ? children : null;
};
