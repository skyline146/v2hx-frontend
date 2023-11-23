import { Button, Flex, Title, Text, TextInput, Modal, PasswordInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

import api from "../../api";
import { useUserStore } from "../../store";
import { SubcriptionText, notification, ProtectedRender } from "../../components";
import { useLogout } from "../../hooks";

import { API_URLS } from "../../helpers/enums";

type IData = {
  newUsername: string;
  password: string;
  newPassword: string;
};

export const UserProfile = () => {
  const { user, updateUsername } = useUserStore((state) => state);

  const logout = useLogout();
  const navigate = useNavigate();

  const [openedLoginModal, { open: openEditLoginModal, close: closeEditLoginModal }] =
    useDisclosure(false);
  const [openedPasswordModal, { open: openPasswordModal, close: closePasswordModal }] =
    useDisclosure(false);

  //edit login form logic

  const formEditLogin = useForm({
    initialValues: {
      username: "",
    },
    validate: {
      username: (value) =>
        !/^[A-Za-z0-9_]{3,30}$/.test(value)
          ? "Username must be 3 < length < 30, contains only a-z, A-Z, 0-9, _"
          : null,
    },
    validateInputOnChange: true,
  });

  const sendNewLogin = () => {
    formEditLogin.validate();

    if (!formEditLogin.isValid()) {
      return;
    }

    sendData(API_URLS.CHANGE_USERNAME, { newUsername: formEditLogin.values.username });

    closeEditLoginModal();
  };

  //edit password form logic

  const formEditPassword = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validate: {
      oldPassword: isNotEmpty("Old password must be provided"),
      confirmNewPassword: (value, values) =>
        value !== values.newPassword ? "Passwords did not match" : null,
    },
    validateInputOnChange: true,
  });

  const sendNewPassword = () => {
    formEditPassword.validate();

    if (!formEditPassword.isValid()) {
      return;
    }

    const { oldPassword, newPassword } = formEditPassword.values;

    sendData(API_URLS.CHANGE_PASSWORD, { password: oldPassword, newPassword });

    closePasswordModal();
  };

  //sending data to server
  const sendData = (url: string, data: Partial<IData>) => {
    api.post(url, data).then((res) => {
      if (res.data === "Username changed!") {
        updateUsername(data.newUsername as string);
      }
      notification({
        message: res.data,
        type: "Success",
      });
    });
  };

  return (
    <>
      {/* Edit username modal */}
      <Modal
        opened={openedLoginModal}
        onClose={closeEditLoginModal}
        title="Enter new username:"
        centered
      >
        <Flex align="center" direction="column">
          <TextInput w="100%" data-autofocus {...formEditLogin.getInputProps("username")} />
          <Button mt={15} w={150} onClick={sendNewLogin}>
            Confirm
          </Button>
        </Flex>
      </Modal>

      {/* Edit password modal */}
      <Modal
        opened={openedPasswordModal}
        onClose={closePasswordModal}
        title="Change password"
        centered
      >
        <Flex align="center" direction="column">
          <PasswordInput
            w="100%"
            label="Old password:"
            data-autofocus
            {...formEditPassword.getInputProps("oldPassword")}
          />
          <PasswordInput
            w="100%"
            label="New password:"
            {...formEditPassword.getInputProps("newPassword")}
          />
          <PasswordInput
            w="100%"
            label="Confirm new password:"
            {...formEditPassword.getInputProps("confirmNewPassword")}
          />
          <Button mt={15} w={150} onClick={sendNewPassword}>
            Confirm
          </Button>
        </Flex>
      </Modal>

      <Flex direction="column">
        <Flex justify="center" align="center" mb={50}>
          <Title
            size="h1"
            fw={700}

            // variant="gradient"
            // gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            Welcome, {user.username}!
          </Title>
          <Button variant="transparent" ml={15} onClick={logout}>
            Logout
          </Button>
        </Flex>

        <Flex justify="center">
          <Flex direction="column" w={300} gap="xs">
            <Button size="md" onClick={openEditLoginModal}>
              Change username
            </Button>
            <Button size="md" onClick={openPasswordModal}>
              Change password
            </Button>
            <ProtectedRender admin={user.admin}>
              <Button size="md" onClick={() => navigate("/admin")}>
                Go to admin panel
              </Button>
            </ProtectedRender>
          </Flex>
        </Flex>

        <Text size="xl" c="gray" fw={700} mt={20}>
          Subscription to: <SubcriptionText expire_date={user.expire_date} />
        </Text>
      </Flex>
    </>
  );
};
