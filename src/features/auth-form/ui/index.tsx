import { Flex, TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { FC } from "react";

import { useAuth } from "shared/lib/hooks";
import { LoginData } from "shared/lib/types";

export const AuthForm: FC = () => {
  const { login, loading, toggleLoading } = useAuth();

  const loginForm = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: isNotEmpty("Login must be provided"),
      password: isNotEmpty("Password must be provided"),
    },
    validateInputOnBlur: true,
  });

  const onLogin = async (formData: LoginData) => {
    loginForm.validate();

    if (!loginForm.isValid()) {
      return;
    }

    toggleLoading();
    await login(formData).finally(toggleLoading);
  };

  return (
    <Flex direction="column" gap="sm">
      <TextInput placeholder="Login" size="md" {...loginForm.getInputProps("username")} />
      <PasswordInput placeholder="Password" size="md" {...loginForm.getInputProps("password")} />
      <Button loading={loading} size="md" onClick={() => onLogin(loginForm.values)}>
        Sign In
      </Button>
      <Button disabled={loading} variant="transparent" size="md" onClick={() => loginForm.reset()}>
        Clear
      </Button>
    </Flex>
  );
};
