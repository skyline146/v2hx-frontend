import { Table, Flex, TextInput, CloseButton, Text } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";

import { usePlayerlistStore } from "store";
import { PlayerRow, PlayerDetailsModal } from "entities/player";
import { playerlistApi } from "shared/api";
import { notification } from "shared/lib";
import { MarkPlayerButton } from "features/mark-player-button";

import { IPlayerRow } from "shared/lib/types";

export const PlayerlistTable = () => {
  //   const [activePage, setPage] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState<IPlayerRow>({} as IPlayerRow);
  //   const [loading, setLoading] = useState(false);

  const [searchValue, setValue] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchValue, 300);

  const { setTotal, setPlayers, updatePlayer, players, total } = usePlayerlistStore(
    (state) => state
  );

  const [openedPlayerModal, { open: openPlayerModal, close: closePlayerModal }] =
    useDisclosure(false);

  const updatePlayerData = (data: IPlayerRow) => {
    playerlistApi.update(data).then(() => {
      updatePlayer(data);
      notification({ type: "Success", message: "Player info updated!" });
      closePlayerModal();
    });
  };

  const deletePlayer = async (username: string) => {
    await playerlistApi.remove(username).then(() => {
      notification({ type: "Success", message: "Player was deleted!" });
      closePlayerModal();
    });

    getPlayers();
  };

  const getPlayers = useCallback(
    (params?: { search_value?: string }) => {
      // setLoading(true);
      playerlistApi.get(params).then((data) => {
        setPlayers(data.players);
        setTotal(data.total);
      });
      //   .finally(() => setLoading(false));
    },
    [setPlayers, setTotal]
  );

  //   useEffect(() => {
  //     getUsers({ page: activePage, search_value: debouncedSearch ? debouncedSearch : undefined });
  //   }, [activePage, debouncedSearch]);

  useEffect(() => {
    getPlayers({ search_value: debouncedSearch ? debouncedSearch : undefined });
  }, [debouncedSearch, getPlayers]);

  const rows = useMemo(
    () =>
      players.map((player) => (
        <PlayerRow
          onClick={() => {
            setCurrentPlayer(player);
            openPlayerModal();
          }}
          key={player.id}
          player={player}
        />
      )),
    [players, openPlayerModal]
  );

  return (
    <>
      <Flex direction="column" align="flex-start">
        {/* Edit user modal */}
        <PlayerDetailsModal
          player={currentPlayer}
          opened={openedPlayerModal}
          close={closePlayerModal}
          updatePlayer={(data) => updatePlayerData(data)}
          deletePlayer={(id) => deletePlayer(id)}
        />

        <Flex mb={20} w="100%" align="center" justify="space-between">
          <TextInput
            w={300}
            mr={20}
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setValue(e.currentTarget.value)}
            rightSection={<CloseButton onClick={() => setValue("")} />}
          />
          <Text>Total: {total}</Text>
          <MarkPlayerButton />
        </Flex>
      </Flex>
      <Table.ScrollContainer minWidth="100%">
        <Table striped highlightOnHover withColumnBorders withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>XUID</Table.Th>
              <Table.Th>Gamertag</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Reason</Table.Th>
              <Table.Th>Added By</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      {/* <Flex mt={10} w="100%" justify="center">
        <Pagination
          disabled={loading}
          value={activePage}
          onChange={setPage}
          total={Math.ceil(total / 10)}
        />
      </Flex> */}
    </>
  );
};
