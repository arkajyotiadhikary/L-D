import { Box, Flex, Text, Button, HStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import VideoPreview from "../components/VideoPreview";
import ModuleDescription from "../components/VideoDescription";
import NavigationButtons from "../components/NavigationComponents";
import Layout from "../layouts/Main";

const Content = () => {
      const { chapter } = useParams();

      return (
            <Layout>
                  <Box p={8} maxW="6xl" mx="auto">
                        <Text fontSize="sm" fontWeight="bold" mb={4}>
                              Chapter {chapter}
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" mb={4}>
                              Prevention of Sexual Harassment
                        </Text>
                        <Flex direction={{ base: "column", md: "row" }} gap={6}>
                              {/* Left Section: Video Preview */}
                              <Box flex="1">
                                    <VideoPreview />
                              </Box>

                              {/* Right Section: Description and Transcript */}
                              <Box flex="1">
                                    <ModuleDescription />
                              </Box>
                        </Flex>

                        {/* Navigation Buttons */}
                        <HStack justify="space-between" mt={8}>
                              <NavigationButtons />
                              <Button
                                    size="sm"
                                    border={"1px"}
                                    colorScheme={"gray"}
                                    variant={"outline"}
                                    borderColor={"gray.400"}
                              >
                                    View Transcript
                              </Button>
                        </HStack>
                  </Box>
            </Layout>
      );
};

export default Content;
