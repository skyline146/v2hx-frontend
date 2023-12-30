import { Flex, Title, Accordion, List, Checkbox, Image } from "@mantine/core";

interface IFeaturesAccordion {
  icon: string;
  title: string;
  columns: { name: string; features: string[] }[];
}

export const FeaturesAccordion = ({ icon, title, columns }: IFeaturesAccordion) => {
  return (
    <Flex direction="column" align="flex-start">
      <Flex align="center">
        <Image w={40} h={40} src={icon} />
        <Title ml={10} mb={10}>
          {title}
        </Title>
      </Flex>
      <Accordion w="100%">
        {columns.map((column) => (
          <Accordion.Item key={column.name} value={column.name}>
            <Accordion.Control>
              <Title size="h3">{column.name}</Title>
            </Accordion.Control>
            <Accordion.Panel>
              <List
                style={{ textAlign: "left" }}
                icon={<Checkbox checked readOnly variant="outline" />}
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
  );
};
