import { Table, Checkbox, Indicator } from "@mantine/core";
import { SubscriptionText } from "entities/subscription-text";
import { IUserRow } from "shared/lib/types";
import { truncate } from "shared/lib";

interface IUserRowProps {
  user: IUserRow;
  onClick: () => void;
}

export const UserRow = ({ user, onClick }: IUserRowProps) => {
  const {
    username,
    discord_id,
    expire_date,
    subscription_type,
    hdd,
    mac_address,
    last_hdd,
    last_mac_address,
    last_entry_date,
    warn,
    ban,
    online,
    ip,
    last_ip,
  } = user;

  return (
    <Table.Tr onClick={onClick} style={{ cursor: "pointer" }}>
      <Table.Td>
        <Indicator zIndex={1} position="top-start" color={online ? "green" : "gray"}>
          {username}
        </Indicator>
      </Table.Td>
      <Table.Td>{truncate(discord_id, 10)}</Table.Td>
      <Table.Td>
        <SubscriptionText subscription_type={subscription_type} expire_date={expire_date} />
      </Table.Td>
      <Table.Td>{truncate(hdd, 20)}</Table.Td>
      <Table.Td>{mac_address}</Table.Td>
      <Table.Td c={last_hdd !== hdd ? "red" : undefined}>{truncate(last_hdd, 20)}</Table.Td>
      <Table.Td c={last_mac_address !== mac_address ? "red" : undefined}>
        {last_mac_address}
      </Table.Td>
      <Table.Td>{last_entry_date ? new Date(last_entry_date).toLocaleString() : ""}</Table.Td>
      <Table.Td>{truncate(ip, 15)}</Table.Td>
      <Table.Td c={last_ip !== ip ? "#DBD33E" : undefined}>{truncate(last_ip, 15)}</Table.Td>
      <Table.Td c={warn !== 0 ? "#FC8C0C" : undefined}>{warn}</Table.Td>
      <Table.Td>
        <Checkbox readOnly checked={ban} />
      </Table.Td>
    </Table.Tr>
  );
};
