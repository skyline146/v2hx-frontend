import { Table, Flex, Text } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import { usePlayerlistStore } from "store";
import { PlayerRow, PlayerDetailsModal } from "entities/player";
import { playerlistApi } from "shared/api";
import { notification } from "shared/lib";
import { MarkPlayerButton } from "features/mark-player-button";
import { SearchInput } from "features/search-input";

import { IPlayerRow } from "shared/lib/types";

export const PlayerlistTable = () => {
  const [currentPlayer, setCurrentPlayer] = useState<IPlayerRow>({} as IPlayerRow);
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

  const { setTotal, setPlayers, updatePlayer, players, total } = usePlayerlistStore(
    (state) => state
  );

  const [openedPlayerModal, { open: openPlayerModal, close: closePlayerModal }] =
    useDisclosure(false);

  const isMobile = useMediaQuery(`(max-width: 700px)`);

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
      playerlistApi.get(params).then((data) => {
        setPlayers(data.players);
        setTotal(data.total);
      });
    },
    [setPlayers, setTotal]
  );

  //   useEffect(() => {
  //     getUsers({ page: activePage, search_value: debouncedSearch ? debouncedSearch : undefined });
  //   }, [activePage, debouncedSearch]);

  useEffect(() => {
    getPlayers({ search_value: searchValue });
  }, [searchValue, getPlayers]);

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

        <Flex
          mb={20}
          w="100%"
          direction={isMobile ? "column-reverse" : "row"}
          justify="space-between"
          gap="md"
        >
          <Flex align="center" direction={isMobile ? "column" : "row"}>
            <SearchInput w={isMobile ? "100%" : 300} onChange={(v) => setSearchValue(v)} />
            <Text ml={isMobile ? 0 : 20} size="xl">
              Total: {total}
            </Text>
          </Flex>
          <MarkPlayerButton w={isMobile ? "100%" : 300} size="sm" />
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
