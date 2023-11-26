import { Button, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface IProtectedRoute {
  admin: boolean;
  children: JSX.Element;
}

export const ProtectedRoute = ({ admin, children }: IProtectedRoute) => {
  const navigate = useNavigate();
  return admin ? (
    children
  ) : (
    <>
      <Title size="h1" fw={700}>
        You don't have access to this page.
      </Title>
      <Button mt={15} w={150} onClick={() => navigate("/profile")}>
        Go to profile
      </Button>
    </>
  );
};
