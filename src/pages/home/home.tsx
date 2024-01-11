import { Box, Button, Flex, Tabs, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { motion } from "framer-motion";

import { AnimatedPage } from "pages/animated-page";
import { FeaturesAccordion } from "./features-accordion";
import { ShowcaseVideo } from "./showcase-video";

import { FeaturesList } from "shared/lib/types";

export const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuresData, setFeaturesData] = useState<FeaturesList | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>("features");

  const isMobile = useMediaQuery(`(max-width: 850px)`);

  useEffect(() => {
    async function fetchFeatures() {
      const data = await fetch("/features.json").then((res) => res.json());

      setFeaturesData(data);
    }

    fetchFeatures();
  }, []);

  return (
    <>
      <Box pos="fixed" left="50%" bottom={5} style={{ zIndex: 200, transform: "translateX(-50%)" }}>
        <a href="https://discord.gg/aqgpZXm5vy" target="_blank">
          <Button
            variant="gradient"
            gradient={{ from: "violet", to: "cyan", deg: 90 }}
            w={300}
            h={60}
            rightSection={<img width={30} height={30} src="/discord.svg" />}
          >
            <Title size="h2">BUY NOW</Title>
          </Button>
        </a>
      </Box>
      <AnimatedPage>
        <Tabs
          // value={activeTab}
          keepMounted={false}
          defaultValue="features"
          mt={-20}
          mb={60}
          onChange={(value) => {
            setActiveTab(value);
            setCurrentSlide(0);
          }}
        >
          <Tabs.List grow mb={10}>
            <Tabs.Tab value="features">
              <Title c={activeTab === "features" ? "violet" : undefined} size="h1">
                Features
              </Title>
            </Tabs.Tab>
            <Tabs.Tab color="red" value="videos">
              <Title c={activeTab === "videos" ? "red" : undefined} size="h1">
                Showcase
              </Title>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="features">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              // exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
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

                {featuresData ? (
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    // exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    style={{
                      flex: 0.5,
                      marginLeft: isMobile ? 0 : 20,
                      marginTop: isMobile ? 15 : 0,
                    }}
                  >
                    <FeaturesAccordion
                      icon={featuresData[currentSlide].icon}
                      title={featuresData[currentSlide].title}
                      columns={featuresData[currentSlide].columns}
                    />
                  </motion.div>
                ) : null}
              </Flex>
            </motion.div>
          </Tabs.Panel>
          <Tabs.Panel value="videos">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              // exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Flex direction="column" align="center" w="100%" pos="relative">
                <ShowcaseVideo title="V2HX Highlights" videoId="G3mvWua21nE" />
                <ShowcaseVideo title="Cannon Aimbot Showcase" videoId="BmTdfcp9wQE" />
                <ShowcaseVideo title="Character Generator Showcase" videoId="15nsy5AwK80" />
              </Flex>
            </motion.div>
          </Tabs.Panel>
        </Tabs>
      </AnimatedPage>
    </>
  );
};
