import { Box, Flex, Text, Image } from "@chakra-ui/react";
import img from "../../assets/images/Dashboard Hero.jpg";

const HeroSection = () => {
      return (
            <Box
                  position="relative"
                  height="400px"
                  width="100%"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="xl"
            >
                  {/* Background Image */}
                  <Image
                        src={img}
                        alt="Dashboard Hero"
                        objectFit="cover"
                        width="100%"
                        height="100%"
                        position="absolute"
                        top="0"
                        left="0"
                  />

                  {/* Gradient Overlay */}
                  <Box
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        bgGradient="linear(to-b, rgba(137, 31, 236, 0.7) 0%, rgba(46, 6, 110, 0.7) 60%)"
                  />

                  {/* Content */}
                  <Flex
                        direction="column"
                        justify="center"
                        align="start"
                        position="relative"
                        height="100%"
                        p={8}
                        zIndex="1"
                  >
                        <Text fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} color="white" mb={4}>
                              Hello, Sanjay!
                        </Text>
                        <Text fontSize={{ base: "xl", md: "2xl" }} color="white" maxWidth="600px">
                              Your upcoming trainings are ready—let's get started!
                        </Text>
                  </Flex>
            </Box>
      );
};

export default HeroSection;
