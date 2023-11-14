import { Title, Flex, TextInput, PasswordInput, Button, Text } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useApi } from "../../hooks";
import { useUserStore } from "../../store";

import { API_URLS } from "../../helpers/enums";

type FormData = {
  username: string;
  password: string;
};

interface LoginData {
  id: string;
  username: string;
  admin: boolean;
  expire_date: string;
}

export const AuthPage = () => {
  const { data, loading, sendRequest } = useApi({
    url: API_URLS.LOGIN,
    method: "post",
    autoRun: false,
  });
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

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

  const login = async (formData: FormData) => {
    loginForm.validate();

    if (!loginForm.isValid()) {
      return;
    }

    sendRequest<FormData>(formData);
  };

  useEffect(() => {
    if (data) {
      const { username, admin, expire_date } = data as LoginData;
      const userData = {
        username,
        admin,
        expire_date,
      };

      setUser(userData);
      navigate("/profile");
    }
  }, [data]);

  return (
    <Flex justify="center" align="center" h="100%">
      <Flex direction="column" w={300}>
        <Title
          size="h1"
          fw={700}
          mb={10}
          // variant="gradient"
          // gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          <Text
            size="lg"
            fw={500}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            V2HX
          </Text>
          Authorization
        </Title>
        <Flex direction="column" gap="sm">
          <TextInput placeholder="Login" size="md" {...loginForm.getInputProps("username")} />
          <PasswordInput
            placeholder="Password"
            size="md"
            {...loginForm.getInputProps("password")}
          />
          <Button loading={loading} size="md" onClick={() => login(loginForm.values)}>
            Sign In
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
      </Flex>
    </Flex>
  );
};
