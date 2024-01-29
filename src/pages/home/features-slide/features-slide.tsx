import { Flex, Title, Accordion, List, Text } from "@mantine/core";
import { useState } from "react";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";

interface IFeaturesAccordion {
  icon: React.ReactNode;
  title: string;
  columns: { name: string; features: string[] }[];
}

export const FeaturesSlide = ({ icon, title, columns }: IFeaturesAccordion) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <Flex direction="column" align="flex-start">
      <Flex align="center">
        <Title c="violet" size="h1" mb={10}>
          <Flex align="center" gap="xs">
            {icon}
            {title}
          </Flex>
        </Title>
      </Flex>
      <Accordion
        value={activeItem}
        w="100%"
        variant="filled"
        radius="md"
        transitionDuration={400}
        onChange={setActiveItem}
        bg="dark.6"
        styles={{ root: { borderRadius: "var(--mantine-radius-md)" } }}
      >
        {columns.map((column) => (
          <Accordion.Item
            key={column.name}
            value={column.name}
            bg={activeItem === column.name ? "dark.8" : "dark.6"}
            // style={{ border: "1px solid var(--mantine-color-dark-4)" }}
            style={{
              transform: activeItem === column.name ? "scale(1.02)" : "scale(1)",
              transitionDuration: "0.4s",
              transitionProperty: "transform",
            }}
          >
            <Accordion.Control
              chevron={
                <IconChevronDown
                  size={30}
                  color={
                    activeItem === column.name ? "var(--mantine-color-violet-text)" : undefined
                  }
                />
              }
            >
              <Title c={activeItem === column.name ? "violet" : undefined} size="h3">
                {column.name}
              </Title>
            </Accordion.Control>
            <Accordion.Panel>
              <List
                style={{ textAlign: "left" }}
                icon={
                  <Flex justify="center" align="center">
                    <IconCheck color="var(--mantine-color-violet-text)" />
                  </Flex>
                }
              >
                {column.features.map((feature) => (
                  <List.Item key={feature}>
                    <Text fw={500}>{feature}</Text>
                  </List.Item>
                ))}
              </List>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Flex>
  );
};
