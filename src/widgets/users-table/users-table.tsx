import { Table, Pagination, Flex, Button, Text, Radio, Menu } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import { UserDetailsModal } from "entities/user/details-modal";
import { UserRow } from "entities/user";
import { SearchInput } from "features/search-input";
import { useUsersStore } from "../../store";
import { credentialsModal, getLogFileDate, notification } from "shared/lib";
import { usersApi } from "shared/api";
import { ConfirmModal } from "shared/ui";

import { IUserRow } from "shared/lib/types";
import type { GetUsers } from "shared/api/users";
import { accountCreatingText } from "shared/config";

export const UsersTable = () => {
  const [activePage, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUserRow>({} as IUserRow);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("");

  const { setTotal, setUsers, updateUser, users, total } = useUsersStore((state) => state);

  const [openedUserModal, { open: openUserModal, close: closeUserModal }] = useDisclosure(false);

  const isMobile = useMediaQuery(`(max-width: 700px)`);

  // console.log(searchValue);

  const createUser = async () => {
    await usersApi.create().then((data) => {
      const { username, password } = data;
      credentialsModal(username, password, accountCreatingText(username, password));
    });

    getUsers({ page: activePage });
  };

  const updateUserData = (data: IUserRow) => {
    usersApi.update(data).then(() => {
      updateUser(data);
      notification({ type: "Success", message: "User info changed!" });
      closeUserModal();
    });
  };

  const deleteUser = async (username: string) => {
    await usersApi.remove(username).then(() => {
      notification({ type: "Success", message: "Account was deleted!" });
      closeUserModal();
    });

    setPage(1);
    getUsers({ page: 1 });
  };

  const addFreeDay = async () => {
    await usersApi.addFreeDay().then(() => {
      notification({ type: "Success", message: "Added 1 free day!" });
    });

    // setPage(1);
    getUsers({ page: activePage });
  };

  const getUsers = useCallback(
    (params: GetUsers) => {
      setLoading(true);
      usersApi
        .get(params)
        .then((data) => {
          setUsers(data.users);
          setTotal(data.total);
        })
        .finally(() => setLoading(false));
    },
    [setTotal, setUsers]
  );

  useEffect(() => {
    getUsers({
      page: activePage,
      search_value: searchValue ? searchValue : undefined,
      filter: filter ? filter : undefined,
    });
  }, [activePage, searchValue, getUsers, filter]);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  // useEffect(() => {
  //   usersApi.getOnline().then((data) => {
  //     setOnlineUsers(data);
  //   });
  // }, []);

  const rows = useMemo(
    () =>
      users.map((user) => (
        <UserRow
          onClick={() => {
            setSelectedUser(user);
            openUserModal();
          }}
          key={user.username}
          user={user}
        />
      )),
    [users, openUserModal]
  );

  return (
    <>
      <Flex direction="column" align="flex-start">
        {/* Edit user modal */}
        <UserDetailsModal
          user={selectedUser}
          opened={openedUserModal}
          close={closeUserModal}
          updateUserData={(data) => updateUserData(data)}
          deleteUser={(username) => deleteUser(username)}
        />

        <Flex
          mb={20}
          w="100%"
          direction={isMobile ? "column-reverse" : "row"}
          justify="space-between"
        >
          <Flex align="center" direction={isMobile ? "column" : "row"}>
            <SearchInput w={isMobile ? "100%" : 400} onChange={(v) => setSearchValue(v)} />
            <Menu trigger="click-hover" shadow="md" width={200} withArrow>
              <Menu.Target>
                <Button ml={10}>Filters</Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Filters</Menu.Label>
                <Menu.Divider />
                <Radio.Group value={filter}>
                  <Menu.Item onClick={() => setFilter("")}>
                    <Radio value="" label="All" />
                  </Menu.Item>
                  <Menu.Item onClick={() => setFilter("active_subscription")}>
                    <Radio value="active_subscription" label="Active Subscription" />
                  </Menu.Item>
                  <Menu.Item onClick={() => setFilter("online")}>
                    <Radio value="online" label="Online" />
                  </Menu.Item>
                </Radio.Group>
              </Menu.Dropdown>
            </Menu>
            <Text ml={isMobile ? 0 : 20} size="xl">
              Total: {total}
            </Text>
          </Flex>
          <Flex gap="md" direction={isMobile ? "column-reverse" : "row"} mb={isMobile ? 20 : 0}>
            <ConfirmModal title="Create account" onConfirm={createUser} />
            <ConfirmModal title="Add 1 free day" onConfirm={addFreeDay} />
            <a href={`/api/info/logs/${getLogFileDate()}`} target="_blank">
              <Button w="100%" variant="default">
                Logs
              </Button>
            </a>
          </Flex>
        </Flex>
      </Flex>
      <Table.ScrollContainer minWidth="100%">
        <Table striped highlightOnHover withColumnBorders withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Username</Table.Th>
              <Table.Th>Discord ID</Table.Th>
              <Table.Th>Subscription</Table.Th>
              <Table.Th>HDD</Table.Th>
              <Table.Th>MAC Address</Table.Th>
              <Table.Th>Last HDD</Table.Th>
              <Table.Th>Last MAC Address</Table.Th>
              <Table.Th>Last Login</Table.Th>
              <Table.Th>IP</Table.Th>
              <Table.Th>Last IP</Table.Th>
              <Table.Th>Warn</Table.Th>
              <Table.Th>Ban</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Flex mt={10} w="100%" justify="center">
        <Pagination
          siblings={0}
          disabled={loading}
          value={activePage}
          onChange={setPage}
          total={Math.ceil(total / 10)}
        />
      </Flex>
    </>
  );
};
