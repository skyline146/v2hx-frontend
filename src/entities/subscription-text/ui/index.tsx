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

  const parsedExpireDate = new Date(expire_date);

  const isActive = parsedExpireDate.getTime() > Date.now();

  let result = "";

  if (isActive) {
    const days = Math.floor((parsedExpireDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      ((parsedExpireDate.getTime() - Date.now()) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    if (days === 0) {
      result = `${hours}h`;
    } else {
      result = `${days}d ${hours}h`;
    }
  }

  return (
    <>
      {isActive ? (
        <Text size={size} c="green">
          {`${result}`}
        </Text>
      ) : (
        <Text size={size} c="red">
          Expired
        </Text>
      )}
    </>
  );
};
