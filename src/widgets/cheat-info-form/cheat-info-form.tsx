import { Flex, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

import { notification } from "shared/lib";
import { infoApi } from "shared/api";
import { Form } from "shared/ui";

export const CheatInfoForm = () => {
  const [loading, setLoading] = useState(false);

  const infoForm = useForm({
    initialValues: {
      status: "",
      cheat_version: "",
      loader_version: "",
    },
  });

  useEffect(() => {
    infoApi.get().then((data) => infoForm.setValues(data));
  }, []);

  return (
    <Flex w="100%" justify="center">
      <Form
        gap="xs"
        loading={loading}
        onSave={() => {
          setLoading(true);
          infoApi
            .update(infoForm.values)
            .then(() => {
              notification({
                type: "Success",
                message: "Info changed!",
              });
            })
            .then(() => setLoading(false));
        }}
      >
        <Flex w={400} gap="xs" direction="column">
          <Select
            label="Status"
            size="md"
            data={["On update", "Available", "Use at own risk"]}
            {...infoForm.getInputProps("status")}
          />
          <TextInput label="Cheat version" size="md" {...infoForm.getInputProps("cheat_version")} />
          <TextInput
            label="Loader version"
            size="md"
            {...infoForm.getInputProps("loader_version")}
          />
        </Flex>
      </Form>
    </Flex>
  );
};
