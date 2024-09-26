import { Box, Flex, Text, Button, HStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import VideoPreview from "./VideoPreview";
import ImagePreview from "./ImagePreview";
import NavigationButtons from "./NavigationComponents";
import ModuleDescription from "./VideoDescription";
import { FaPlay } from "react-icons/fa";

interface ChapterData {
      title: string;
      description: string;
      imageUrl: string;
      videoUrl: string;
      contentType: string;
}

interface DynamicContentLayoutProps {
      chapterData: ChapterData;
}

const DynamicContentLayout: React.FC<DynamicContentLayoutProps> = ({ chapterData }) => {
      const { id } = useParams();

      const renderContent = () => {
            switch (chapterData.contentType) {
                  case "video":
                        return (
                              <Box p={8} mx="auto" h="100vh">
                                    <Text fontSize="sm" fontWeight="bold" mb={4}>
                                          {id !== "1" ? "Chapter " + id : ""}
                                    </Text>
                                    <Text fontSize="2xl" fontWeight="bold" mb={4}>
                                          {chapterData.title}
                                    </Text>
                                    <Flex direction={{ base: "column", md: "row" }} gap={6}>
                                          {/* Left Section: Video Preview or Image Preview */}
                                          <Box
                                                flex="1"
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                          >
                                                <VideoPreview
                                                      height="50vh"
                                                      videoUrl={chapterData.videoUrl}
                                                      title={chapterData.title}
                                                />
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
                                          </Box>
                                    </Flex>
                                    <HStack justify="space-between" mt={8}>
                                          <NavigationButtons currentChapter={Number(id)} />
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
                        );
                  case "text":
                        return (
                              <Flex flex="1" p={4} bg="white">
                                    <Box flex="1" p={4} borderRadius="md" mr={4}>
                                          <Text fontSize="lg" fontWeight="bold">
                                                Chapter {id}
                                          </Text>
                                          <Text fontSize="2xl" fontWeight="bold" mt={2}>
                                                {chapterData.title}
                                          </Text>
                                          <Text
                                                fontSize="xl"
                                                color="gray.700"
                                                mt={4}
                                                sx={{
                                                      whiteSpace: "pre-wrap",
                                                      wordBreak: "break-word",
                                                }}
                                          >
                                                {chapterData.description}
                                          </Text>
                                          <HStack justify="space-between" mt={4}>
                                                <NavigationButtons currentChapter={Number(id)} />
                                                <Button leftIcon={<FaPlay />} variant="outline">
                                                      Play
                                                </Button>
                                          </HStack>
                                    </Box>
                                    <Box flex="1" ml={4}>
                                          <ImagePreview imageUrl={chapterData.imageUrl} />
                                    </Box>
                              </Flex>
                        );
                  default:
                        return <Text>Unsupported content type</Text>;
            }
      };

      return <>{renderContent()}</>;
};

export default DynamicContentLayout;
