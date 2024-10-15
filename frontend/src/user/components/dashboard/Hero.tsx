import { Box, Flex, Text } from "@chakra-ui/react";
import useUserStore from "../../../store";
const HeroSection = () => {
      const user = useUserStore((state) => state.user);
      return (
            <Box
                  position="relative"
                  height="300px"
                  width="100%"
                  borderRadius="lg"
                  overflow="hidden"
            >
                  {/* Background Image */}

                  {/* Gradient Overlay */}
                  <Box position="absolute" top="0" left="0" width="100%" height="100%" />

                  {/* Content */}
                  <Flex
                        direction="column"
                        justify="center"
                        align="start"
                        position="relative"
                        height="100%"
                        mx={275}
                        zIndex="1"
                  >
                        <Text
                              fontSize="48px"
                              fontWeight="600"
                              letterSpacing="-0.003px"
                              color="#1d1d1f"
                              mb={4}
                        >
                              Hello, {user?.email}!
                        </Text>
                        <Text fontSize={{ base: "xl", md: "3xl" }} color="#6e6e73" maxWidth="700px">
                              Your upcoming trainings are ready—let's get started!
                        </Text>
                  </Flex>
            </Box>
      );
};

export default HeroSection;
