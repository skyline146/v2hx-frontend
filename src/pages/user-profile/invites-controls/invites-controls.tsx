import { Flex, Text, CopyButton, Button, TextInput, Kbd } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconSend, IconPencil } from "@tabler/icons-react";
import { useState } from "react";

import { invitesApi } from "shared/api";
import { notification } from "shared/lib";
import { Form, ModalButton } from "shared/ui";
import { useUserStore } from "store";

export const InvitesControls = () => {
  const [loading, setLoading] = useState(false);
  const { is_code_activated, invitation_code, code_activations } = useUserStore(
    (state) => state.user
  );
  const updateUser = useUserStore((state) => state.updateUser);

  const [openedGetModal, { open: openGetModal, close: closeGetModal }] = useDisclosure(false);
  const [openedEnterModal, { open: openEnterModal, close: closeEnterModal }] = useDisclosure(false);

  //create invitation code
  const createCodeForm = useForm({
    initialValues: {
      code: "",
    },
    validate: {
      code: isNotEmpty("Code should not be empty"),
    },
    validateInputOnChange: true,
  });

  const createCode = () => {
    createCodeForm.validate();

    if (!createCodeForm.isValid()) {
      return;
    }

    const { code } = createCodeForm.values;

    setLoading(true);
    invitesApi
      .create({ code })
      .then((message) => {
        updateUser({ invitation_code: code });
        notification({
          message,
          type: "Success",
        });
      })
      .finally(() => setLoading(false));
  };

  //enter another user's code form
  const sendCodeForm = useForm({
    initialValues: {
      code: "",
    },
    validate: {
      code: (value) =>
        value === "" ? "Code should not be empty" : value === invitation_code ? "Seriously?" : null,
    },
  });

  const sendCode = () => {
    sendCodeForm.validate();

    if (!sendCodeForm.isValid()) {
      return;
    }

    const { code } = sendCodeForm.values;

    setLoading(true);
    invitesApi
      .accept({ code })
      .then((user) => {
        updateUser({ ...user, is_code_activated: true });
        closeEnterModal();
        notification({
          message: "Code activated!",
          type: "Success",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Flex direction="column" gap="xs" w="100%">
      <ModalButton
        title="My Code"
        icon={<IconSend />}
        w="100%"
        opened={openedGetModal}
        open={openGetModal}
        close={closeGetModal}
      >
        <Flex direction="column">
          {invitation_code ? (
            <Flex direction="column" gap="md">
              <Text fw={500} size="xl">
                Users invited: {code_activations}
              </Text>
              <Kbd size="xl">{invitation_code}</Kbd>
              <CopyButton value={invitation_code}>
                {({ copied, copy }) => (
                  <Button color={copied ? "teal" : "blue"} onClick={copy}>
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                )}
              </CopyButton>
              <Button
                color="red"
                onClick={() => {
                  updateUser({ invitation_code: "" });
                }}
              >
                Reset Code
              </Button>
            </Flex>
          ) : (
            <Form onSave={createCode} loading={loading}>
              <TextInput
                w="100%"
                size="md"
                label="Enter new code:"
                data-autofocus
                {...createCodeForm.getInputProps("code")}
              />
            </Form>
          )}
        </Flex>
      </ModalButton>
      <ModalButton
        title="Enter Code"
        icon={<IconPencil />}
        w="100%"
        disabled={is_code_activated}
        opened={openedEnterModal}
        open={openEnterModal}
        close={closeEnterModal}
      >
        <Form onSave={sendCode} loading={false}>
          <TextInput
            w="100%"
            size="md"
            label="Code:"
            data-autofocus
            {...sendCodeForm.getInputProps("code")}
          />
          <Text c="red">Note: only once per account.</Text>
        </Form>
      </ModalButton>
    </Flex>
  );
};
