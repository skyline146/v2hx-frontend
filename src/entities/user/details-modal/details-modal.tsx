import {
  Modal,
  Flex,
  Button,
  TextInput,
  NumberInput,
  CloseButton,
  Checkbox,
  Image,
  Text,
  Fieldset,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconMapPin } from "@tabler/icons-react";
import { useEffect } from "react";

import { usersApi } from "shared/api";
import { SUBSCRIPTION, SubscriptionType } from "shared/config";
import { credentialsModal, addSubscription, notification } from "shared/lib";
import { IUserRow } from "shared/lib/types";
import { Form, ActionButton, ConfirmModal } from "shared/ui";

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
  const userForm = useForm<IUserRow>();

  useEffect(() => {
    userForm.setValues(user);
  }, [user]);

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Text fw={500} size="lg">
          Username: {userForm.values.username}
        </Text>
      }
      centered
      closeOnClickOutside={false}
      // styles={{ body: { paddingRight: 0 } }}
    >
      <Form onSave={() => updateUserData(userForm.values)}>
        <Flex direction="column" gap="xs" pb={1}>
          <ConfirmModal
            title="Delete account"
            confirmColor="red"
            confirmLabel="Delete"
            disabled={userForm.values.admin}
            onConfirm={() => deleteUser(userForm.values.username)}
          ></ConfirmModal>
          <ConfirmModal
            title="Reset password"
            confirmLabel="Reset"
            onConfirm={() =>
              usersApi
                .resetPassword(userForm.values.username)
                .then((data) =>
                  credentialsModal(
                    userForm.values.username,
                    data.password,
                    `Username: ${userForm.values.username}\nPassword: ${data.password}`
                  )
                )
            }
          ></ConfirmModal>
          <ConfirmModal
            title="Disconnect"
            confirmColor="cyan"
            onConfirm={() =>
              usersApi
                .disconnect(userForm.values.username)
                .then(() => notification({ message: "Event emitted!", type: "Success" }))
            }
          ></ConfirmModal>
          <TextInput
            label="Discord"
            size="md"
            style={{ overflow: "hidden" }}
            rightSection={
              <ActionButton
                link={`https://discordlookup.com/user/${userForm.values.discord_id}`}
                icon={<Image src="/discord.svg" />}
              />
            }
            {...userForm.getInputProps("discord_id")}
          />
          <Fieldset legend="Subscription" m={0} pl={10} pr={10}>
            <Flex direction="column" gap="xs">
              <TextInput label="Type" size="md" {...userForm.getInputProps("subscription_type")} />
              <TextInput
                label="Duration"
                size="md"
                rightSection={
                  <CloseButton
                    onClick={() =>
                      userForm.setValues({
                        expire_date: SubscriptionType.No,
                        subscription_type: SubscriptionType.No,
                      })
                    }
                  />
                }
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
                    userForm.setValues({
                      expire_date: addSubscription(userForm.values.expire_date, SUBSCRIPTION.WEEK),
                      subscription_type: SubscriptionType.Week,
                    })
                  }
                >
                  Week
                </Button>
                <Button
                  onClick={() =>
                    userForm.setValues({
                      expire_date: addSubscription(userForm.values.expire_date, SUBSCRIPTION.MONTH),
                      subscription_type: SubscriptionType.Month,
                    })
                  }
                >
                  Month
                </Button>
                <Button
                  onClick={() =>
                    userForm.setValues({
                      expire_date: SUBSCRIPTION.LIFETIME,
                      subscription_type: SubscriptionType.Lifetime,
                    })
                  }
                >
                  ∞
                </Button>
              </Flex>
            </Flex>
          </Fieldset>
          <Fieldset legend="Invites" m={0} pl={10} pr={10}>
            <Flex direction="column" gap="xs">
              <Text>Users invited: {userForm.values.code_activations}</Text>
              <TextInput
                label="Invitation Code"
                size="md"
                {...userForm.getInputProps("invitation_code")}
              />
              <Checkbox
                label="Code Activated"
                size="md"
                {...userForm.getInputProps("is_code_activated", { type: "checkbox" })}
              />
            </Flex>
          </Fieldset>
          <Fieldset legend="Login Data" m={0} pl={10} pr={10}>
            <Flex direction="column" gap="xs">
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
                value={userForm.values.last_entry_date}
              />
              <TextInput
                readOnly
                label="IP"
                size="md"
                value={userForm.values.ip}
                rightSection={
                  <ActionButton
                    link={`https://whatismyipaddress.com/ip/${userForm.values.ip}`}
                    icon={<IconMapPin />}
                  />
                }
              />
              <TextInput
                readOnly
                label="Last IP"
                value={userForm.values.last_ip}
                size="md"
                rightSection={
                  <ActionButton
                    link={`https://whatismyipaddress.com/ip/${userForm.values.last_ip}`}
                    icon={<IconMapPin />}
                  />
                }
              />
            </Flex>
          </Fieldset>
          <Fieldset legend="Restrictions" m={0} pl={10} pr={10}>
            <Flex direction="column" gap="xs">
              <Checkbox
                label="Dev build access"
                size="md"
                {...userForm.getInputProps("private_access", { type: "checkbox" })}
              />
              <NumberInput label="Warns" size="md" {...userForm.getInputProps("warn")} />
              <Checkbox
                label="Ban"
                size="md"
                {...userForm.getInputProps("ban", { type: "checkbox" })}
              />
            </Flex>
          </Fieldset>
        </Flex>
      </Form>
    </Modal>
  );
};
