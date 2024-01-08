import { TextInput, Select } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { FC, useState } from "react";

import { playerlistApi } from "shared/api";
import { notification } from "shared/lib";
import { ModalButton } from "shared/ui/modal-button";
import { Form } from "shared/ui";
import { Player } from "shared/lib/types";

export const MarkPlayerButton: FC = () => {
  const [loading, setLoading] = useState(false);

  const [openedPassModal, { open: openPassModal, close: closePassModal }] = useDisclosure(false);

  //edit password form logic
  const playerForm = useForm<Omit<Player, "xuid" | "type"> & { type: string }>({
    initialValues: {
      gamertag: "",
      type: "",
      reason: "",
    },
    validate: {
      gamertag: isNotEmpty("Gamertag must be provided"),
      reason: isNotEmpty("Reason must be provided"),
      type: isNotEmpty("Type must be provided"),
    },
    validateInputOnChange: true,
  });

  const addPlayer = async () => {
    playerForm.validate();

    if (!playerForm.isValid()) {
      return;
    }

    setLoading(true);
    playerlistApi
      .add({ ...playerForm.values, type: +playerForm.values.type })
      .then((message) => {
        closePassModal();
        playerForm.reset();
        notification({
          message,
          type: "Success",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <ModalButton
      title="Mark Player (Server Playerlist)"
      variant="default"
      opened={openedPassModal}
      open={openPassModal}
      close={closePassModal}
    >
      <Form onSave={addPlayer} loading={loading}>
        <TextInput label="Gamertag" size="md" {...playerForm.getInputProps("gamertag")} />
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
        <TextInput label="Reason/Link" size="md" {...playerForm.getInputProps("reason")} />
      </Form>
    </ModalButton>
  );
};
