import { Text } from "@mantine/core";

export const SubcriptionText = (props: { expire_date: string }) => {
  const { expire_date } = props;
  if (!expire_date) {
    return <Text>No subscription</Text>;
  } else {
    if (expire_date === "Lifetime") {
      return (
        <Text
          //   size="xl"
          variant="gradient"
          gradient={{ from: "#FFE066", to: "#FD7E14", deg: 90 }}
          fw={700}
        >
          Lifetime
        </Text>
      );
    }

    return <Text c="green">{new Date(expire_date).toLocaleString()}</Text>;
  }
};
