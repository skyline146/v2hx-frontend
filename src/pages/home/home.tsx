import { Flex, List, Tabs, Text, Title, Accordion, Image, Checkbox } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";

const featuresData = [
  {
    title: "Assistance",
    icon: "/menu/icons/aim.png",
    columns: [
      {
        name: "Weapons",
        features: [
          "Silent Aim",
          "Always Aim",
          "Custom Visible Check",
          "Aim FOV",
          "Target Line",
          "Wallbangs",
          "Remove VFX/SFX",
          "Weapon Wireframe",
          "Gun Mods (including Quick Swap)",
          "Sword Mods",
          "Server Side Hit Marker",
          "Bullet Tracer",
        ],
      },
      {
        name: "Cannon",
        features: [
          "Aimbot at all types of ships",
          "Cannon Tracer",
          "Cannonball Tracer",
          "Remove Cannon VFX",
        ],
      },
      {
        name: "Harpoon",
        features: ["Aim at Loot/Barrels/Players"],
      },
    ],
  },
  {
    title: "Visuals",
    icon: "/menu/icons/visuals.png",
    columns: [
      {
        name: "Players",
        features: [
          "Draw Enemies/Alliance",
          "2D/3D boxes",
          "Health Bar",
          "Skeleton",
          "Line to target",
          "Name",
          "Weapon",
        ],
      },
      {
        name: "Enemy AI",
        features: [
          "Draw all types of Enemy AI",
          "2D/3D boxes",
          "Skeleton",
          "Line To Target",
          "Name",
          "Weapon",
        ],
      },
      {
        name: "Animals",
        features: ["Draw all types of Animals", "2D box"],
      },
      {
        name: "Loot",
        features: ["Draw all types of Loot", "Show Cost"],
      },
      {
        name: "Ships",
        features: [
          "Draw all types of ships",
          "Name",
          "Emissary",
          "Speed",
          "Water",
          "Damage",
          "Supplies",
          "Average gold",
        ],
      },
      {
        name: "World",
        features: [
          "Draw Barrel Supplies",
          "Cooking Pots",
          "Ammo",
          "Rowboats",
          "Shipwrecks",
          "Seagulls",
          "Mermaids",
          "Statues",
          "Storm",
          "Beacon",
          "Events",
          "Map Table Pins",
          "Map Table Keys",
        ],
      },
      { name: "Quests", features: ["XMark Maps", "Riddle Maps", "Bounty Parchments"] },
    ],
  },
  {
    title: "Misc",
    icon: "/menu/icons/misc.png",
    columns: [
      {
        name: "FOV",
        features: ["FOV Types (Static/Dynamic/Custom)", "Zoom (like minecraft optifine)"],
      },
      {
        name: "Client",
        features: [
          "Active Event",
          "Active Emissary",
          "Compass",
          "Oxygen",
          "Crosshair",
          "Ship Info",
          "Crews List",
          "Kill-Feed",
        ],
      },
      {
        name: "Removals",
        features: [
          "Remove Loot (to increase fps)",
          "Water",
          "Storm",
          "Clouds",
          "Fog (global and underwater)",
          "Sky Dome",
          "Shadows",
          "Foliage",
        ],
      },
      {
        name: "Others",
        features: [
          "Custom Time",
          "Bunny Hop",
          "Disable AFK",
          "Third Person",
          "Free Camera (loads islands and ships)",
          "Auto Anchor Dropper",
          "Auto Ammo Grabber",
          "Water Wireframe",
          "Sails Wireframe",
          "Sails Resize",
        ],
      },
      {
        name: "Exploits",
        features: [
          "Underwater Walking",
          "Underwater Sliding",
          "Slow Motion",
          "Invulnerability",
          "God Mode",
          "Air Jump",
          "Black Screen",
          "Quick Death",
          "Force Drop",
          "Magic Trident",
          "Emote/Death Walking",
          "Remove Supplies Timer",
          "Fast Load",
          "Fast Ladder",
          "Long-Range Interaction",
        ],
      },
      {
        name: "Character Generator",
        features: ["Ability to change Gender, Ethnicity, Eye Color, Makeup, Age, etc"],
      },
    ],
  },
  {
    title: "Settings",
    icon: "/menu/icons/settings.png",
    columns: [
      {
        name: "Global",
        features: ["Vote To Scuttle", "Vote To Scuttle & Change Seas", "Return To Main Menu"],
      },
      {
        name: "Config",
        features: ["Config System"],
      },
    ],
  },
];

export const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useMediaQuery(`(max-width: 850px)`);

  return (
    <Tabs color="grape" defaultValue="features">
      <Tabs.List grow justify="center" mb={10}>
        <Tabs.Tab value="features">
          <Text size="md">Features</Text>
        </Tabs.Tab>
        <Tabs.Tab value="video">
          <Text size="md">Videos</Text>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="features">
        <Flex w="100%" style={{ flex: 1 }} direction={isMobile ? "column" : "row"}>
          <Carousel
            withIndicators
            withControls={!isMobile}
            controlSize={40}
            loop
            dragFree={isMobile}
            className="menu-carousel"
            style={{ flex: 0.5 }}
            onSlideChange={(index) => setCurrentSlide(index)}
          >
            <Carousel.Slide>
              <img src="/menu/assistance.png" />
            </Carousel.Slide>
            <Carousel.Slide>
              <img src="/menu/visuals.png" />
            </Carousel.Slide>
            <Carousel.Slide>
              <img src="/menu/misc.png" />
            </Carousel.Slide>
            <Carousel.Slide>
              <img src="/menu/settings.png" />
            </Carousel.Slide>
          </Carousel>
          <Flex
            style={{ flex: 0.5, marginLeft: 20, marginTop: isMobile ? 15 : 0 }}
            direction="column"
            align="flex-start"
          >
            <Flex align="center">
              <Image w={40} h={40} src={featuresData[currentSlide].icon} />
              <Title ml={10} mb={10}>
                {featuresData[currentSlide].title}
              </Title>
            </Flex>
            <Accordion w="100%">
              {featuresData[currentSlide].columns.map((column) => (
                <Accordion.Item key={column.name} value={column.name}>
                  <Accordion.Control>
                    <Title size="h3">{column.name}</Title>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <List
                      style={{ textAlign: "left" }}
                      icon={<Checkbox defaultChecked readOnly variant="outline" />}
                    >
                      {column.features.map((feature) => (
                        <List.Item key={feature}>{feature}</List.Item>
                      ))}
                    </List>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Flex>
        </Flex>
      </Tabs.Panel>
      <Tabs.Panel value="video">
        <Flex direction="column" align="center" w="100%" pos="relative">
          <Title size={isMobile ? "h2" : "h1"} mb={10}>
            V2HX Highlights
          </Title>
          <iframe
            width="100%"
            height="520"
            src="https://www.youtube.com/embed/G3mvWua21nE?showinfo=0&rel=0"
            title="| V2HX HACK | craziest sot pvp montage ever clip dump (King of the PC) FullHD |93 fov| |14,9 fps|"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <Title size={isMobile ? "h2" : "h1"} mt={10} mb={10}>
            Cannon Aimbot Showcase
          </Title>
          <iframe
            width="100%"
            height="520"
            src="https://www.youtube.com/embed/BmTdfcp9wQE?showinfo=0&rel=0"
            title="Sea of Thieves Cannon Aimbot Showcase | V2HX HACK"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Flex>
      </Tabs.Panel>
    </Tabs>
  );
};
