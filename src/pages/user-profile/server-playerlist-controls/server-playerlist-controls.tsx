import { Badge, Fieldset, Flex, Group, Text, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

import { MarkPlayerButton } from "features/mark-player-button";
import { SearchInput } from "features/search-input";
import { ModalButton } from "shared/ui";
import { playerlistApi } from "shared/api";
import { playerType, playerBadge } from "shared/config";

import { Player } from "shared/lib/types";

export const ServerPlayerlistControls = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [player, setPlayer] = useState<Omit<Player, "xuid">>();
  const [loading, setLoading] = useState(false);

  const [openedSearch, { open: openSearchModal, close: closeSearchModal }] = useDisclosure(false);

  useEffect(() => {
    if (searchValue) {
      setLoading(true);
      playerlistApi
        .findOne(searchValue)
        .then((data) => setPlayer(data))
        .finally(() => setLoading(false));
    } else {
      setPlayer(undefined);
    }
  }, [searchValue]);

  return (
    <Fieldset variant="filled" legend={<Text size="lg">{"Server Playerlist"}</Text>} p={10}>
      <Flex direction="column" gap="xs">
        <MarkPlayerButton w="100%" />
        <ModalButton
          title="Find Player"
          w="100%"
          opened={openedSearch}
          open={openSearchModal}
          close={closeSearchModal}
        >
          <Flex direction="column">
            <SearchInput w="100%" onChange={(v) => setSearchValue(v)} />
            {loading ? (
              <Flex justify="center">
                <Loader mt={20} />
              </Flex>
            ) : null}
            {player ? (
              <>
                <Group justify="space-between" mt="md" mb="xs">
                  <Text size="xl" fw={500}>
                    {player.gamertag}
                  </Text>
                  <Badge color={playerBadge[player.type]}>{playerType[player.type]}</Badge>
                </Group>

                <Text>{player.reason}</Text>
              </>
            ) : null}
          </Flex>
        </ModalButton>
      </Flex>
    </Fieldset>
  );
};
