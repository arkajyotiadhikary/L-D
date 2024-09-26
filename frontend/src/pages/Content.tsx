import { Box, Flex, Text, Button, HStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import VideoPreview from "../components/VideoPreview";
import ModuleDescription from "../components/VideoDescription";
import ImagePreview from "../components/ImagePreview";
import NavigationButtons from "../components/NavigationComponents";
import Layout from "../layouts/Main";

const Content = () => {
      const { chapter } = useParams();

      // For demonstration, let's assume we get the type of content dynamically from a source
      const contentType = "image"; // This can be "video" or "image", based on the data you fetch

      return (
            <Layout>
                  <Box p={8} maxW="6xl" mx="auto" h="100vh">
                        <Text fontSize="sm" fontWeight="bold" mb={4}>
                              Chapter {chapter}
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold" mb={4}>
                              Prevention of Sexual Harassment
                        </Text>
                        <Flex direction={{ base: "column", md: "row" }} gap={6}>
                              {/* Left Section: Video Preview or Image Preview */}
                              <Box
                                    flex="1"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                              >
                                    {contentType === "video" ? (
                                          <VideoPreview /> // Video component
                                    ) : (
                                          <ImagePreview /> // Image component
                                    )}
                              </Box>

                              {/* Right Section: Description and Transcript */}
                              <Box
                                    flex="1"
                                    overflowY="auto"
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="space-between"
                              >
                                    <ModuleDescription />
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
                        </Flex>
                  </Box>
            </Layout>
      );
};

export default Content;
