import { Text } from "@mantine/core";

export const SubcriptionText = (props: { expire_date: string; size?: string }) => {
  const { expire_date, size } = props;

  if (!expire_date) {
    return <Text size={size}>No subscription</Text>;
  }

  if (expire_date === "Lifetime") {
    return (
      <Text
        size={size}
        variant="gradient"
        gradient={{ from: "#FFE066", to: "#FD7E14", deg: 90 }}
        fw={700}
      >
        Lifetime
      </Text>
    );
  }

  const isActive = new Date(expire_date).getTime() > Date.now();

  return (
    <>
      <Text size={size} c="green">
        {new Date(expire_date).toLocaleString()}
      </Text>
      <Text size={size} c={isActive ? "teal" : "red"}>
        {isActive ? "Active" : "Expired"}
      </Text>
    </>
  );
};
