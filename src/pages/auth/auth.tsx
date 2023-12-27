import { Title, Flex } from "@mantine/core";

import { AuthForm } from "features/auth-form";

export const AuthPage = () => {
  return (
    <Flex justify="center" align="center">
      <Flex direction="column" w={300}>
        <Title size="h1" fw={700} mb={10}>
          Login
        </Title>
        <AuthForm />
      </Flex>
    </Flex>
  );
};
