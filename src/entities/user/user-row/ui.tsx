import { Table, Checkbox } from "@mantine/core";
import { SubcriptionText } from "entities/subscription-text";
import { IUserRow } from "shared/lib/types";

interface IUserRowProps {
  user: IUserRow;
  onClick: () => void;
}

export const UserRow = ({ user, onClick }: IUserRowProps) => {
  const {
    username,
    discord_username,
    expire_date,
    hdd,
    mac_address,
    last_hdd,
    last_mac_address,
    last_entry_date,
    warn,
    ban,
  } = user;

  return (
    <Table.Tr onClick={onClick} style={{ cursor: "pointer" }}>
      <Table.Td>{username}</Table.Td>
      <Table.Td>{discord_username}</Table.Td>
      <Table.Td>
        <SubcriptionText expire_date={expire_date} />
      </Table.Td>
      <Table.Td>{hdd}</Table.Td>
      <Table.Td>{mac_address}</Table.Td>
      <Table.Td bg={last_hdd !== hdd ? "red" : "none"}>{last_hdd}</Table.Td>
      <Table.Td bg={last_mac_address !== mac_address ? "red" : "none"}>{last_mac_address}</Table.Td>
      <Table.Td>{last_entry_date ? new Date(last_entry_date).toLocaleString() : ""}</Table.Td>
      <Table.Td bg={+warn !== 0 ? "yellow" : "none"}>{warn}</Table.Td>
      <Table.Td>
        <Checkbox readOnly checked={ban} />
      </Table.Td>
    </Table.Tr>
  );
};
