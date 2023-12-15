import { Flex, TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { FC } from "react";

import { validateUsername } from "shared/lib";
import { useAuth } from "shared/lib/hooks";

export const AuthForm: FC = () => {
  const { login, loading, toggleLoading } = useAuth();

  const loginForm = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) => validateUsername(value),
      password: isNotEmpty("Password must be provided"),
    },
    validateInputOnChange: true,
  });

  const onLogin = async () => {
    loginForm.validate();

    if (!loginForm.isValid()) {
      return;
    }

    toggleLoading();
    await login(loginForm.values).finally(toggleLoading);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onLogin();
      }}
    >
      <Flex direction="column" gap="sm">
        <TextInput placeholder="Login" size="md" {...loginForm.getInputProps("username")} />
        <PasswordInput placeholder="Password" size="md" {...loginForm.getInputProps("password")} />
        <Button type="submit" loading={loading} size="md">
          LOGIN
        </Button>
        <Button
          disabled={loading}
          variant="transparent"
          size="md"
          onClick={() => loginForm.reset()}
        >
          Clear
        </Button>
      </Flex>
    </form>
  );
};
