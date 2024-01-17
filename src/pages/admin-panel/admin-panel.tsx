import { Tabs, Title } from "@mantine/core";

import { CheatInfoForm } from "widgets/cheat-info-form";
import { UsersTable } from "widgets/users-table";
import { PlayerlistTable } from "widgets/playerlist-table";

export const AdminPanel = () => {
  return (
    <Tabs defaultValue="users">
      <Tabs.List mt={-20} mb={10} grow justify="center">
        <Tabs.Tab value="users">
          <Title size="h3">Users</Title>
        </Tabs.Tab>
        <Tabs.Tab value="playerlist">
          <Title size="h3">Playerlist</Title>
        </Tabs.Tab>
        <Tabs.Tab value="info">
          <Title size="h3">Cheat Info</Title>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="users">
        <UsersTable />
      </Tabs.Panel>
      <Tabs.Panel value="playerlist">
        <PlayerlistTable />
      </Tabs.Panel>
      <Tabs.Panel value="info">
        <CheatInfoForm />
      </Tabs.Panel>
    </Tabs>
  );
};
