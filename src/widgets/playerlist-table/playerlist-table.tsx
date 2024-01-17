import { Table, Flex, Text, Pagination } from "@mantine/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import { usePlayerlistStore } from "store";
import { PlayerRow, PlayerDetailsModal } from "entities/player";
import { playerlistApi } from "shared/api";
import { notification } from "shared/lib";
import { MarkPlayerButton } from "features/mark-player-button";
import { SearchInput } from "features/search-input";

import { IPlayerRow } from "shared/lib/types";
import { GetPlayerlist } from "shared/api/playerlist";

export const PlayerlistTable = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayerRow>({} as IPlayerRow);
  const [activePage, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState(false);

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

    setPage(1);
    getPlayers({ page: 1 });
  };

  const getPlayers = useCallback(
    (params: GetPlayerlist) => {
      setLoading(true);
      playerlistApi
        .get(params)
        .then((data) => {
          setPlayers(data.players);
          setTotal(data.total);
        })
        .finally(() => setLoading(false));
    },
    [setPlayers, setTotal]
  );

  useEffect(() => {
    getPlayers({ page: activePage, search_value: searchValue ? searchValue : undefined });
  }, [activePage, searchValue, getPlayers]);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const rows = useMemo(
    () =>
      players.map((player) => (
        <PlayerRow
          onClick={() => {
            setSelectedPlayer(player);
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
          player={selectedPlayer}
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

      <Flex mt={10} w="100%" justify="center">
        <Pagination
          siblings={0}
          disabled={loading}
          value={activePage}
          onChange={setPage}
          total={Math.ceil(total / 10)}
        />
      </Flex>
    </>
  );
};
