import { Table } from "@mantine/core";

import { playerType } from "shared/config";
import { IPlayerRow } from "shared/lib/types";
import { truncate } from "shared/lib";

interface IPlayerRowProps {
  player: IPlayerRow;
  onClick: () => void;
}

export const PlayerRow = ({ player, onClick }: IPlayerRowProps) => {
  const { xuid, gamertag, type, reason, added_by } = player;

  return (
    <Table.Tr onClick={onClick} style={{ cursor: "pointer" }}>
      <Table.Td>{xuid}</Table.Td>
      <Table.Td>{gamertag}</Table.Td>
      <Table.Td>{playerType[type]}</Table.Td>
      <Table.Td>{truncate(reason, 30)}</Table.Td>
      <Table.Td>{added_by}</Table.Td>
    </Table.Tr>
  );
};
