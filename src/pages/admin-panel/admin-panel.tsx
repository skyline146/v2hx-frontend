import { Box, Button, Flex, Title, Tabs } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { CheatInfoForm } from "widgets/cheat-info-form";
import { UsersTable } from "widgets/users-table";

export const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Flex justify="center" align="center">
        <Title size="h1" fw={700}>
          Admin Panel
        </Title>
        <Button variant="default" ml={15} onClick={() => navigate("/profile")}>
          PROFILE
        </Button>
      </Flex>

      <Tabs color="grape" defaultValue="users">
        <Tabs.List justify="center">
          <Tabs.Tab value="users">Users</Tabs.Tab>
          <Tabs.Tab value="info">Cheat Info</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel mt={20} value="users">
          <UsersTable />
        </Tabs.Panel>
        <Tabs.Panel mt={20} value="info">
          <CheatInfoForm />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};
