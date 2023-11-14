import { Button, Title } from "@mantine/core";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IProtectedRoute {
  admin: boolean;
  element: ReactNode;
}
export const ProtectedRoute = ({ admin, element }: IProtectedRoute): ReactNode => {
  const navigate = useNavigate();
  return admin ? (
    element
  ) : (
    <>
      <Title size="h1" fw={700}>
        You don't have access to this page.
      </Title>
      <Button mt={15} w={150} onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </>
  );
};
