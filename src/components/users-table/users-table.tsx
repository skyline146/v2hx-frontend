import {
  Table,
  Pagination,
  Flex,
  Checkbox,
  Modal,
  Button,
  TextInput,
  CloseButton,
  em,
} from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebouncedValue, useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";

import { User, useUsersStore } from "../../store";
import { API_URLS, SUBSCRIPTION } from "../../helpers/enums";
import api from "../../api";
import { SubcriptionText, credentialsModal, notification } from "..";
import { addSubscription } from "../../helpers/utils";

export const UsersTable = () => {
  const [activePage, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [searchValue, setValue] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchValue, 300);

  const setUsers = useUsersStore((state) => state.setUsers);
  const setTotal = useUsersStore((state) => state.setTotal);
  const updateUser = useUsersStore((state) => state.updateUser);
  const users = useUsersStore((state) => state.users);
  const total = useUsersStore((state) => state.total);

  const [openedUserModal, { open: openUserModal, close: closeUserModal }] = useDisclosure(false);

  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const userForm = useForm({
    initialValues: {} as User,
  });

  const changeUser = () => {
    api.patch(API_URLS.USERS + `/${userForm.values.username}`, userForm.values).then(() => {
      updateUser(userForm.values);
      notification({ type: "Success", message: "User info changed!" });
    });

    closeUserModal();
  };

  const resetPassword = () => {
    api.post(API_URLS.USERS + `/${userForm.values.username}/reset-password`).then((res) => {
      credentialsModal(userForm.values.username, res.data.password);
    });
  };

  const deleteAccount = async () => {
    await api.delete(API_URLS.USERS + `/${userForm.values.username}`).then(() => {
      notification({ type: "Success", message: "Account was deleted!" });
    });

    getUsers(1);
    closeUserModal();
  };

  const createUser = () => {
    api.post(API_URLS.USERS).then((res) => {
      const { username, password } = res.data as { username: string; password: string };

      credentialsModal(username, password);
    });
  };

  const addFreeDay = async () => {
    await api.patch(API_URLS.ADD_FREE_DAY).then(() => {
      notification({ type: "Success", message: "Added 1 free day!" });
    });

    getUsers(1);
  };

  const getUsers = useCallback((page: number, username: string | undefined = undefined) => {
    setLoading(true);
    api
      .get(API_URLS.USERS, { params: { page, username } })
      .then((res) => {
        setUsers(res.data.users);
        setTotal(res.data.total);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getUsers(activePage, debouncedSearch);
  }, [activePage, debouncedSearch]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const rows = useMemo(
    () =>
      users.map((user) => {
        const {
          username,
          expire_date,
          hdd,
          mac_address,
          last_hdd,
          last_mac_address,
          last_entry_date,
          warn,
          ban,
        } = user;

        console.log(typeof warn);

        return (
          <Table.Tr
            key={username}
            style={{ cursor: "pointer" }}
            onClick={() => {
              userForm.setValues(user);
              openUserModal();
            }}
          >
            <Table.Td>{username}</Table.Td>
            <Table.Td>
              <SubcriptionText expire_date={expire_date} />
            </Table.Td>
            <Table.Td>{hdd}</Table.Td>
            <Table.Td>{mac_address}</Table.Td>
            <Table.Td bg={last_hdd !== hdd ? "red" : "none"}>{last_hdd}</Table.Td>
            <Table.Td bg={last_mac_address !== mac_address ? "red" : "none"}>
              {last_mac_address}
            </Table.Td>
            <Table.Td>{last_entry_date ? new Date(last_entry_date).toLocaleString() : ""}</Table.Td>
            <Table.Td bg={+warn !== 0 ? "yellow" : "none"}>{warn}</Table.Td>
            <Table.Td>
              <Checkbox readOnly checked={ban} />
            </Table.Td>
          </Table.Tr>
        );
      }),
    [users]
  );

  //todo. expire date changing

  return (
    <Flex direction="column" align="flex-start">
      {/* Edit user modal */}
      <Modal
        opened={openedUserModal}
        onClose={closeUserModal}
        title={`Username: ${userForm.values.username}`}
        centered
      >
        <Flex direction="column" gap="xs">
          <Button color="red" disabled={userForm.values.admin} onClick={deleteAccount}>
            Delete account
          </Button>
          <Button mt={15} onClick={resetPassword}>
            Reset password
          </Button>
          <TextInput
            readOnly
            label="Expire date"
            size="md"
            rightSection={<CloseButton onClick={() => userForm.setFieldValue("expire_date", "")} />}
            {...userForm.getInputProps("expire_date")}
          />
          <Flex justify="space-between">
            <Button
              onClick={() =>
                userForm.setFieldValue(
                  "expire_date",
                  addSubscription(userForm.values.expire_date, SUBSCRIPTION.DAY)
                )
              }
            >
              Day
            </Button>
            <Button
              onClick={() =>
                userForm.setFieldValue(
                  "expire_date",
                  addSubscription(userForm.values.expire_date, SUBSCRIPTION.WEEK)
                )
              }
            >
              Week
            </Button>
            <Button
              onClick={() =>
                userForm.setFieldValue(
                  "expire_date",
                  addSubscription(userForm.values.expire_date, SUBSCRIPTION.MONTH)
                )
              }
            >
              Month
            </Button>
            <Button onClick={() => userForm.setFieldValue("expire_date", SUBSCRIPTION.LIFETIME)}>
              ∞
            </Button>
          </Flex>
          <TextInput label="Hdd" size="md" {...userForm.getInputProps("hdd")} />
          <TextInput label="Mac address" size="md" {...userForm.getInputProps("mac_address")} />
          <TextInput label="Last hdd" size="md" {...userForm.getInputProps("last_hdd")} />
          <TextInput
            label="Last mac address"
            size="md"
            {...userForm.getInputProps("last_mac_address")}
          />
          <TextInput
            readOnly
            label="Last entry date"
            size="md"
            {...userForm.getInputProps("last_entry_date")}
          />
          <TextInput type="number" label="Warn" size="md" {...userForm.getInputProps("warn")} />
          <Checkbox
            label="Ban"
            size="md"
            {...userForm.getInputProps("ban", { type: "checkbox" })}
          />
          <Button mt={15} onClick={changeUser}>
            Save
          </Button>
        </Flex>
      </Modal>

      <Flex
        mb={20}
        w="100%"
        direction={isMobile ? "column-reverse" : "row"}
        justify="space-between"
      >
        <TextInput
          w={400}
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setValue(e.currentTarget.value)}
          rightSection={<CloseButton onClick={() => setValue("")} />}
        />
        <Flex mb={isMobile ? 20 : 0}>
          <Button w={200} mr={20} onClick={createUser}>
            + Create new account
          </Button>
          <Button onClick={addFreeDay}>Add 1 free day</Button>
        </Flex>
      </Flex>

      <Table striped highlightOnHover withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Username</Table.Th>
            <Table.Th>Expire date</Table.Th>
            <Table.Th>Hdd</Table.Th>
            <Table.Th>Mac address</Table.Th>
            <Table.Th>Last hdd</Table.Th>
            <Table.Th>Last mac address</Table.Th>
            <Table.Th>Last entry date</Table.Th>
            <Table.Th>Warn</Table.Th>
            <Table.Th>Ban</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      <Flex w="100%" justify="center">
        <Pagination
          mt={20}
          mb={20}
          disabled={loading}
          value={activePage}
          onChange={setPage}
          total={Math.ceil(total / 10)}
        />
      </Flex>
    </Flex>
  );
};
