import { Box, Button, Flex, TextInput, Title, Select, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import api from "../../api";
import { API_URLS } from "../../helpers/enums";
import { credentialsModal, notification, UsersTable } from "../../components";
import { useDisclosure } from "@mantine/hooks";

export const AdminPanel = () => {
  const navigate = useNavigate();

  const [openedChangeInfoModal, { open: openChangeInfoModal, close: closeChangeInfoModal }] =
    useDisclosure(false);

  const infoForm = useForm({
    initialValues: {
      status: "",
      cheat_version: "",
      loader_version: "",
    },
  });

  const changeInfo = () => {
    api.patch(API_URLS.INFO, infoForm.values).then(() => {
      notification({
        type: "Success",
        message: "Info changed!",
      });
    });

    closeChangeInfoModal();
  };

  const createUser = () => {
    api.post(API_URLS.USERS).then((res) => {
      const { username, password } = res.data as { username: string; password: string };

      credentialsModal(username, password);
    });
  };

  useEffect(() => {
    api.get(API_URLS.INFO).then((res) => infoForm.setValues(res.data));
  }, []);

  return (
    <Box>
      {/* Edit info modal */}
      <Modal
        opened={openedChangeInfoModal}
        onClose={closeChangeInfoModal}
        title="Change cheat info"
        centered
      >
        <Flex direction="column" gap="xs">
          <Select
            label="Status"
            size="md"
            data={["On update", "Available", "Use at own risk"]}
            {...infoForm.getInputProps("status")}
          />
          <TextInput label="Cheat version" size="md" {...infoForm.getInputProps("cheat_version")} />
          <TextInput
            label="Loader version"
            size="md"
            {...infoForm.getInputProps("loader_version")}
          />
          <Button mt={15} onClick={changeInfo}>
            Save
          </Button>
        </Flex>
      </Modal>

      <Flex justify="center" align="center" mb={10}>
        <Title size="h1" fw={700} mb={10}>
          Admin Panel
        </Title>
        <Button variant="transparent" ml={15} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Flex>

      <Flex mt={30} direction="column">
        <Flex justify="space-between" mb={20}>
          <Button w={200} onClick={createUser}>
            + Create new account
          </Button>
          <Button onClick={openChangeInfoModal}>Change cheat info</Button>
        </Flex>
        <UsersTable />
      </Flex>
    </Box>
  );
};
