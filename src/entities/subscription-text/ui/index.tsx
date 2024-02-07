import { Text } from "@mantine/core";
import { SubscriptionType } from "shared/config";
// import { UserRo } from "shared/api/users/models";

export const SubscriptionText = (props: {
  subscription_type: SubscriptionType;
  expire_date: string;
  size?: string;
}) => {
  const { subscription_type, expire_date, size } = props;

  if (!subscription_type) {
    return <Text size={size}>No subscription</Text>;
  }

  if (subscription_type === "Lifetime") {
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

  if (!isActive) {
    return (
      <Text size={size} c="red">
        Expired
      </Text>
    );
  }

  let resultTime = "";
  const days = Math.floor((parsedExpireDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    ((parsedExpireDate.getTime() - Date.now()) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  if (days === 0) {
    resultTime = `${hours}h`;
  } else {
    resultTime = `${days}d ${hours}h`;
  }

  return (
    <Text size={size} c="green">
      {`${resultTime}`}
    </Text>
  );
};
