import { Flex, Title, Accordion, List, Checkbox, Text } from "@mantine/core";
import { useState } from "react";

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
        variant="separated"
        transitionDuration={400}
        onChange={setActiveItem}
      >
        {columns.map((column) => (
          <Accordion.Item key={column.name} value={column.name}>
            <Accordion.Control>
              <Title c={activeItem === column.name ? "violet" : undefined} size="h3">
                {column.name}
              </Title>
            </Accordion.Control>
            <Accordion.Panel>
              <List
                style={{ textAlign: "left" }}
                icon={<Checkbox checked readOnly variant="outline" />}
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
