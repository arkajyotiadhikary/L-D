import { Box, Flex, Text, Button, HStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import VideoPreview from "./VideoPreview";
import ImagePreview from "./ImagePreview";
import NavigationButtons from "./NavigationComponents";
import { FaPlay } from "react-icons/fa";

interface Chapter {
      title: string;
      description: string;
      content: {
            type: "text" | "video";
            url: string;
      };
}

interface DynamicContentLayoutProps {
      chapter: Chapter[];
      currentModule: string;
}

const DynamicContentLayout: React.FC<DynamicContentLayoutProps> = ({ chapter, currentModule }) => {
      const { content } = useParams();

      if (!content) {
            return <Text>Invalid content</Text>;
      }

      console.log(content);

      const chapterIndex = Number(content);

      // Check if the chapter exists at the given index
      if (chapterIndex < 0 || chapterIndex >= chapter.length + 1) {
            console.log(chapterIndex);
            return <Text>Chapter not found</Text>;
      }

      const currentChapter = chapter[chapterIndex - 1];

      console.log(currentChapter);

      const renderContent = () => {
            switch (currentChapter.content.type) {
                  case "video":
                        return (
                              <Box p={8} mx="auto" h="100vh">
                                    <Text fontSize="sm" fontWeight="bold" mb={4}>
                                          {content !== "1" ? "Chapter " + content : ""}
                                    </Text>
                                    <Text fontSize="2xl" fontWeight="bold" mb={4}>
                                          {currentChapter.title}
                                    </Text>

                                    {/* Video and description */}
                                    <Flex direction={{ base: "column", md: "row" }} gap={6}>
                                          <Box
                                                flex="1"
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                          >
                                                <VideoPreview
                                                      height="50vh"
                                                      videoUrl={currentChapter.content.url}
                                                      title={currentChapter.title}
                                                />
                                          </Box>
                                          <Box
                                                flex="1"
                                                overflowY="auto"
                                                display="flex"
                                                flexDirection="column"
                                                justifyContent="space-between"
                                          >
                                                <Box
                                                      color="gray.700"
                                                      mt={4}
                                                      dangerouslySetInnerHTML={{
                                                            __html: currentChapter.description,
                                                      }}
                                                />
                                          </Box>
                                    </Flex>
                                    {/* Navigation buttons */}
                                    <HStack justify="space-between" mt={8}>
                                          <NavigationButtons
                                                currentChapter={chapterIndex}
                                                currentModule={currentModule}
                                                totalChapters={chapter.length}
                                          />
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
                                                Chapter {content}
                                          </Text>
                                          <Text fontSize="2xl" fontWeight="bold" mt={2}>
                                                {currentChapter.title}
                                          </Text>
                                          <Box
                                                fontSize="xl"
                                                color="gray.700"
                                                mt={4}
                                                sx={{
                                                      whiteSpace: "pre-wrap",
                                                      wordBreak: "break-word",
                                                }}
                                                dangerouslySetInnerHTML={{
                                                      __html: currentChapter.description,
                                                }}
                                          />

                                          <HStack justify="space-between" mt={4}>
                                                <NavigationButtons
                                                      currentChapter={chapterIndex}
                                                      currentModule={currentModule}
                                                      totalChapters={chapter.length}
                                                />
                                                <Button leftIcon={<FaPlay />} variant="outline">
                                                      Play
                                                </Button>
                                          </HStack>
                                    </Box>
                                    <Box flex="1" ml={4}>
                                          <ImagePreview imageUrl={currentChapter.content.url} />
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
