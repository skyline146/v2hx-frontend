import {
  Button,
  Flex,
  Title,
  Text,
  Tabs,
  Box,
  Card,
  Divider,
  HoverCard,
  List,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconAddressBook,
  IconServerCog,
  IconGift,
  IconDownload,
  IconInfoCircle,
} from "@tabler/icons-react";

import { AnimatedPage } from "pages/animated-page";
import { useUserStore } from "store";
import { UserProfileControls } from "./user-profile-controls";
import { ServerPlayerlistControls } from "./server-playerlist-controls";
import { InvitesControls } from "./invites-controls";
import { SubscriptionText } from "entities/subscription-text";

export const UserProfile = () => {
  const { username, expire_date, is_active_subscription, subscription_type } = useUserStore(
    (state) => state.user
  );

  const isMobile = useMediaQuery(`(max-width: 550px)`);

  return (
    <AnimatedPage>
      <Flex justify="center">
        <Flex direction="column" align="center">
          <Flex justify="center" align="center" mb={15} wrap="wrap">
            <Title size="h1" fw={700}>
              👋Welcome, {username}!
            </Title>
          </Flex>
          <Text size="xl" c="gray" fw={700}>
            Subscription:
          </Text>
          <Card w={250} p={5}>
            <SubscriptionText
              size="xl"
              subscription_type={subscription_type}
              expire_date={expire_date}
            />
          </Card>

          {!is_active_subscription ? (
            <Box>
              <a href="https://discord.gg/8bDf3BdbYd" target="_blank">
                <Button
                  variant="gradient"
                  gradient={{ from: "violet", to: "cyan", deg: 90 }}
                  size="lg"
                  mt={20}
                  // rightSection={<img width={30} height={30} src="/discord.svg" />}
                >
                  Renew Subscription
                </Button>
              </a>
            </Box>
          ) : (
            <>
              <Divider size="sm" my="sm" w="100%" />
              <Flex justify="center" mt={10} mb={10}>
                <Box w={isMobile ? "100%" : 550}>
                  <Tabs
                    orientation={isMobile ? "horizontal" : "vertical"}
                    variant="default"
                    defaultValue="profile"
                    styles={{ panel: { display: "flex", alignItems: "center" } }}
                  >
                    <Tabs.List mr={isMobile ? 0 : 15} justify="flex-start" grow>
                      <Tabs.Tab value="profile" leftSection={<IconAddressBook />}>
                        <Text size="lg">Account</Text>
                      </Tabs.Tab>
                      <Tabs.Tab
                        value="playerlist"
                        leftSection={<IconServerCog />}
                        rightSection={
                          <HoverCard>
                            <HoverCard.Target>
                              <IconInfoCircle color="#09B8FF" />
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                              <Text fw={500}>
                                You can add player(Mark Player) to playerlist by gamertag, that
                                match category:
                              </Text>
                              <List>
                                <List.Item>Streamer🟣</List.Item>
                                <List.Item>Cheater🔴</List.Item>
                                <List.Item>Toxic🟢</List.Item>
                              </List>
                              <Text>
                                If marked player is in your session, they gamertag be highlighted
                                due to category.
                              </Text>
                              <Text fw={500}>
                                If you want to check if player already marked in database,
                              </Text>
                              <Text fw={500}>
                                enter gamertag(case insensitive) in search field(Find Player).
                              </Text>
                            </HoverCard.Dropdown>
                          </HoverCard>
                        }
                      >
                        <Text size="lg">Server Playerlist</Text>
                      </Tabs.Tab>
                      <Tabs.Tab
                        value="bonus"
                        leftSection={<IconGift />}
                        rightSection={
                          <HoverCard>
                            <HoverCard.Target>
                              <IconInfoCircle color="#09B8FF" />
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                              <Text>Click "My Code" button to create your own code.</Text>
                              <Text fw={500} size="lg">
                                Rules:
                              </Text>
                              <List>
                                <List.Item>
                                  both users must have active subscription to activate code
                                </List.Item>
                                <List.Item>code can be activated only once per account</List.Item>
                              </List>
                              <Text fw={500}>
                                User, who enters invitation code receives 1 bonus day.
                              </Text>
                              <Text fw={500}>Code owner receives, if invited user buy:</Text>
                              <List>
                                <List.Item>Week: 1 bonus day</List.Item>
                                <List.Item>Month: 3 bonus days</List.Item>
                                <List.Item>Lifetime: 7 bonus days</List.Item>
                              </List>
                            </HoverCard.Dropdown>
                          </HoverCard>
                        }
                      >
                        <Text size="lg">Bonus</Text>
                      </Tabs.Tab>
                    </Tabs.List>
                    <Card w="100%" mt={isMobile ? 15 : 0}>
                      <Tabs.Panel value="profile">
                        <UserProfileControls />
                      </Tabs.Panel>
                      <Tabs.Panel value="playerlist">
                        <ServerPlayerlistControls />
                      </Tabs.Panel>
                      <Tabs.Panel value="bonus">
                        <InvitesControls />
                      </Tabs.Panel>
                    </Card>
                  </Tabs>
                </Box>
              </Flex>
              <Divider size="sm" my="sm" w="100%" />
              <a href="/api/loader" target="_blank">
                <Button
                  disabled={!is_active_subscription}
                  w={300}
                  variant="default"
                  size="md"
                  leftSection={<IconDownload />}
                >
                  Download V2HX
                </Button>
              </a>
            </>
          )}
        </Flex>
      </Flex>
    </AnimatedPage>
  );
};
