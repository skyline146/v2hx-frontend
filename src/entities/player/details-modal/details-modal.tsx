import { Modal, Flex, Button, TextInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBrandXbox } from "@tabler/icons-react";
import { useEffect } from "react";

import { IPlayerRow } from "shared/lib/types";
import { Form, ActionButton } from "shared/ui";

interface IUserDetailsModal {
  player: IPlayerRow;
  opened: boolean;
  open?: () => void;
  close: () => void;
  updatePlayer: (data: IPlayerRow) => void;
  deletePlayer: (id: string) => void;
}

type PlayerForm = Omit<IPlayerRow, "type"> & { type: string };

export const PlayerDetailsModal = ({
  player,
  opened,
  close,
  updatePlayer,
  deletePlayer,
}: IUserDetailsModal) => {
  const playerForm = useForm<PlayerForm>();

  useEffect(() => {
    playerForm.setValues({ ...player, type: player.type?.toString() });
  }, [player]);

  return (
    <Modal opened={opened} onClose={close} title={`ID: ${playerForm.values.id}`} centered>
      <Form onSave={() => updatePlayer({ ...playerForm.values, type: +playerForm.values.type })}>
        <Flex w="100%" direction="column" gap="xs">
          <Button color="red" onClick={() => deletePlayer(playerForm.values.id)}>
            Delete
          </Button>
          <TextInput label="XUID" size="md" {...playerForm.getInputProps("xuid")} />
          <TextInput
            label="Gamertag"
            size="md"
            rightSection={
              <ActionButton
                link={`https://account.xbox.com/en-us/profile?gamertag=${encodeURIComponent(
                  playerForm.values.gamertag
                )}`}
                bg="var(--mantine-color-green-filled)"
                icon={<IconBrandXbox size={28} />}
              />
            }
            {...playerForm.getInputProps("gamertag")}
          />
          <Select
            label="Type"
            size="md"
            data={[
              { label: "Streamer", value: "1" },
              { label: "Cheater", value: "2" },
              { label: "Toxic", value: "3" },
            ]}
            {...playerForm.getInputProps("type")}
          />
          <TextInput label="Reason" size="md" {...playerForm.getInputProps("reason")} />
          <TextInput
            readOnly
            label="Added By"
            size="md"
            {...playerForm.getInputProps("added_by")}
          />
        </Flex>
      </Form>
    </Modal>
  );
};
