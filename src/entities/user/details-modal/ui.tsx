import { Modal, Flex, Button, TextInput, NumberInput, CloseButton, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

import { usersApi } from "shared/api";
import { SUBSCRIPTION } from "shared/config";
import { credentialsModal, addSubscription } from "shared/lib";
import { IUserRow } from "shared/lib/types";
import { Form, ActionButton } from "shared/ui";

interface IUserDetailsModal {
  user: IUserRow;
  opened: boolean;
  open?: () => void;
  close: () => void;
  updateUserData: (data: IUserRow) => void;
  deleteUser: (username: string) => void;
}

export const UserDetailsModal = ({
  user,
  opened,
  close,
  updateUserData,
  deleteUser,
}: IUserDetailsModal) => {
  const userForm = useForm({
    initialValues: user,
  });

  useEffect(() => {
    userForm.setValues(user);
  }, [user]);

  return (
    <Modal opened={opened} onClose={close} title={`Username: ${userForm.values.username}`} centered>
      <Form onSave={() => updateUserData(userForm.values)}>
        <Flex w="100%" direction="column" gap="xs">
          <Button
            color="red"
            disabled={userForm.values.admin}
            onClick={() => deleteUser(userForm.values.username)}
          >
            Delete account
          </Button>
          <Button
            mt={15}
            onClick={() =>
              usersApi
                .resetPassword(userForm.values.username)
                .then((data) => credentialsModal(userForm.values.username, data.password))
            }
          >
            Reset password
          </Button>

          <TextInput
            label="Discord"
            size="md"
            style={{ overflow: "hidden" }}
            rightSection={
              <ActionButton
                link={`https://discordlookup.com/user/${userForm.values.discord_id}`}
                img="/discord.svg"
              />
            }
            {...userForm.getInputProps("discord_id")}
          />

          <TextInput
            readOnly
            label="Subscription"
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
          <TextInput label="HDD" size="md" {...userForm.getInputProps("hdd")} />
          <TextInput label="MAC Address" size="md" {...userForm.getInputProps("mac_address")} />
          <TextInput label="Last HDD" size="md" {...userForm.getInputProps("last_hdd")} />
          <TextInput
            label="Last MAC Address"
            size="md"
            {...userForm.getInputProps("last_mac_address")}
          />
          <TextInput
            readOnly
            label="Last Login"
            size="md"
            {...userForm.getInputProps("last_entry_date")}
          />
          <TextInput
            readOnly
            label="IP"
            size="md"
            rightSection={
              <ActionButton
                link={`https://whatismyipaddress.com/ip/${userForm.values.ip}`}
                img="/pin.png"
              />
            }
            {...userForm.getInputProps("ip")}
          />
          <TextInput
            readOnly
            label="Last IP"
            size="md"
            rightSection={
              <ActionButton
                link={`https://whatismyipaddress.com/ip/${userForm.values.last_ip}`}
                img="/pin.png"
              />
            }
            {...userForm.getInputProps("last_ip")}
          />
          <NumberInput label="Warn" size="md" {...userForm.getInputProps("warn")} />
          <Checkbox
            label="Ban"
            size="md"
            {...userForm.getInputProps("ban", { type: "checkbox" })}
          />
        </Flex>
      </Form>
    </Modal>
  );
};
