import { Title, Button } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IProtectedRoute {
  isAuthenticated: boolean;
  adminOnly?: boolean;
  isAdmin?: boolean;
  children: JSX.Element;
}

export const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminOnly,
  isAdmin,
}: IProtectedRoute) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

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

  return isAuthenticated ? children : null;
};
