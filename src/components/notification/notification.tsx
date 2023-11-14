import { notifications } from "@mantine/notifications";

interface INotification {
  message: string;
  type: "Error" | "Success";
}

export const notification = ({ message, type }: INotification) =>
  notifications.show({
    title: `${type}! ${message}`,
    message: "",
    color: type === "Error" ? "red" : "green",
    autoClose: 2000,
  });
