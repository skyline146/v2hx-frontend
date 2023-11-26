import { Title, Flex, Text } from "@mantine/core";

import { AuthForm } from "features/auth-form";

export const AuthPage = () => {
  return (
    <Flex justify="center" align="center" h="100%">
      <Flex direction="column" w={300}>
        <Title size="h1" fw={700} mb={10}>
          <Text
            size="lg"
            fw={500}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            V2HX
          </Text>
          Login
        </Title>
        <AuthForm />
      </Flex>
    </Flex>
  );
};
