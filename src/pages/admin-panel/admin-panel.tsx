import { Box, Button, Flex, TextInput, Title, Select, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import api from "../../api";
import { API_URLS } from "../../helpers/enums";
import { notification, UsersTable } from "../../components";

export const AdminPanel = () => {
  const navigate = useNavigate();

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
  };

  useEffect(() => {
    api.get(API_URLS.INFO).then((res) => infoForm.setValues(res.data));
  }, []);

  return (
    <Box>
      <Flex justify="center" align="center">
        <Title size="h1" fw={700}>
          Admin Panel
        </Title>
        <Button variant="transparent" ml={15} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Flex>

      <Tabs color="grape" defaultValue="accounts">
        <Tabs.List justify="center">
          <Tabs.Tab value="accounts">Accounts</Tabs.Tab>
          <Tabs.Tab value="info">Cheat info</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel mt={20} value="accounts">
          <UsersTable />
        </Tabs.Panel>
        <Tabs.Panel mt={20} value="info">
          <Flex w="100%" justify="center">
            <Flex w={400} direction="column" gap="xs">
              <Select
                label="Status"
                size="md"
                data={["On update", "Available", "Use at own risk"]}
                {...infoForm.getInputProps("status")}
              />
              <TextInput
                label="Cheat version"
                size="md"
                {...infoForm.getInputProps("cheat_version")}
              />
              <TextInput
                label="Loader version"
                size="md"
                {...infoForm.getInputProps("loader_version")}
              />
              <Button mt={15} onClick={changeInfo}>
                Save
              </Button>
            </Flex>
          </Flex>
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};
