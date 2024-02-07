import { Badge, Flex, Group, Text, Loader, Card } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { IconSearch, IconBrandXbox } from "@tabler/icons-react";

import { MarkPlayerButton } from "features/mark-player-button";
import { SearchInput } from "features/search-input";
import { ActionButton, ModalButton } from "shared/ui";
import { playerlistApi } from "shared/api";

import { playerType, playerBadge } from "shared/config";
import { Player } from "shared/lib/types";

export const ServerPlayerlistControls = () => {
  const [searchValue, setSearchValue] = useState("");
  const [player, setPlayer] = useState<Omit<Player, "xuid">>();
  const [loading, setLoading] = useState(false);

  const [openedSearch, { open: openSearchModal, close: closeSearchModal }] = useDisclosure(false);

  useEffect(() => {
    setPlayer(undefined);
    if (searchValue) {
      setLoading(true);
      playerlistApi
        .findOne(searchValue)
        .then((data) => setPlayer(data))
        .finally(() => setLoading(false));
    }
  }, [searchValue]);

  return (
    <Flex direction="column" gap="xs" w="100%">
      <MarkPlayerButton w="100%" />
      <ModalButton
        title="Find Player"
        icon={<IconSearch />}
        w="100%"
        opened={openedSearch}
        open={openSearchModal}
        close={closeSearchModal}
      >
        <Flex direction="column">
          <SearchInput
            w="100%"
            v={searchValue}
            onChange={(v) => setSearchValue(v)}
            debounce={500}
          />
          {loading ? (
            <Flex justify="center">
              <Loader mt={20} />
            </Flex>
          ) : player ? (
            <Card mt="md" shadow="sm" radius="md">
              <Group>
                <Text size="xl" fw={500}>
                  {player.gamertag}
                </Text>
                <Badge color={playerBadge[player.type]}>{playerType[player.type]}</Badge>
                <ActionButton
                  link={`https://account.xbox.com/en-us/profile?gamertag=${encodeURIComponent(
                    player.gamertag
                  )}`}
                  bg="var(--mantine-color-green-filled)"
                  icon={<IconBrandXbox size={28} />}
                />
              </Group>

              <Text>{player.reason}</Text>
            </Card>
          ) : null}
        </Flex>
      </ModalButton>
    </Flex>
  );
};
