import { Flex, TextInput, PasswordInput } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { FC, useState } from "react";

import { usersApi } from "shared/api";
import { useUserStore } from "store";
import { notification } from "shared/lib";
import { ModalButton } from "shared/ui/modal-button";
import { Form } from "shared/ui";

export const UserProfileControls: FC = () => {
  const updateUsername = useUserStore((state) => state.updateUsername);
  const [loading, setLoading] = useState(false);

  const [openedLoginModal, { open: openLoginModal, close: closeLoginModal }] = useDisclosure(false);
  const [openedPassModal, { open: openPassModal, close: closePassModal }] = useDisclosure(false);

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

    const { username: newUsername } = formEditLogin.values;

    setLoading(true);
    usersApi
      .changeUsername({ newUsername })
      .then((message) => {
        updateUsername(newUsername);
        closeLoginModal();
        notification({
          message,
          type: "Success",
        });
      })
      .finally(() => setLoading(false));
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

  const sendNewPassword = async () => {
    formEditPassword.validate();

    if (!formEditPassword.isValid()) {
      return;
    }

    const { oldPassword, newPassword } = formEditPassword.values;

    setLoading(true);
    usersApi
      .changePassword({ password: oldPassword, newPassword })
      .then((message) => {
        closePassModal();
        notification({
          message,
          type: "Success",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Flex direction="column" gap="xs">
      <ModalButton
        title="Change username"
        opened={openedLoginModal}
        open={openLoginModal}
        close={closeLoginModal}
      >
        <Form onSave={sendNewLogin} loading={loading}>
          <TextInput
            w="100%"
            label="New username:"
            data-autofocus
            {...formEditLogin.getInputProps("username")}
          />
        </Form>
      </ModalButton>
      <ModalButton
        title="Change password"
        opened={openedPassModal}
        open={openPassModal}
        close={closePassModal}
      >
        <Form onSave={sendNewPassword} loading={loading}>
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
        </Form>
      </ModalButton>
    </Flex>
  );
};
