import { Tabs, Text } from "@mantine/core";

import { CheatInfoForm } from "widgets/cheat-info-form";
import { UsersTable } from "widgets/users-table";

export const AdminPanel = () => {
  return (
    <Tabs color="grape" defaultValue="users">
      <Tabs.List grow justify="center">
        <Tabs.Tab value="users">
          <Text size="md">Users</Text>
        </Tabs.Tab>
        <Tabs.Tab value="info">
          <Text size="md">Cheat Info</Text>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel mt={20} value="users">
        <UsersTable />
      </Tabs.Panel>
      <Tabs.Panel mt={20} value="info">
        <CheatInfoForm />
      </Tabs.Panel>
    </Tabs>
  );
};
