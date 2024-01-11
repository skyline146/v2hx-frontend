import { Table, Pagination, Flex, Button } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import { UserDetailsModal } from "entities/user/details-modal";
import { UserRow } from "entities/user";
import { SearchInput } from "features/search-input";
import { useUsersStore } from "../../store";
import { credentialsModal, getLogFileDate, notification } from "shared/lib";
import { IUserRow } from "shared/lib/types";
import type { GetUsers } from "shared/api/users";
import { usersApi } from "shared/api";

export const UsersTable = () => {
  const [activePage, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUserRow>({} as IUserRow);
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

  const { setTotal, setUsers, updateUser, users, total } = useUsersStore((state) => state);

  const [openedUserModal, { open: openUserModal, close: closeUserModal }] = useDisclosure(false);

  const isMobile = useMediaQuery(`(max-width: 700px)`);

  const createUser = async () => {
    await usersApi.create().then((data) => {
      const { username, password } = data;
      credentialsModal(username, password);
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

    setPage(1);
    getUsers({ page: 1 });
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
    getUsers({ page: activePage, search_value: searchValue });
  }, [activePage, searchValue, getUsers]);

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
            setCurrentUser(user);
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
          user={currentUser}
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
          <SearchInput w={isMobile ? "100%" : 400} onChange={(v) => setSearchValue(v)} />
          {/* <Text c="green">Online: {onlineUsers.total}</Text> */}
          <Flex gap="md" direction={isMobile ? "column-reverse" : "row"} mb={isMobile ? 20 : 0}>
            <Button onClick={createUser}>+ Create New Account</Button>
            <Button onClick={addFreeDay}>Add 1 Free Day</Button>
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
              <Table.Th>Discord</Table.Th>
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
          disabled={loading}
          value={activePage}
          onChange={setPage}
          total={Math.ceil(total / 10)}
        />
      </Flex>
    </>
  );
};
