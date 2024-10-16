import { Box, Flex, Text, Button, HStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import VideoPreview from "./VideoPreview";
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

      console.log("content", content);

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
                              <Box
                                    bgImage={currentChapter.content.url}
                                    bgPosition="center"
                                    bgSize="cover"
                                    minH={"92vh"}
                              >
                                    <Flex
                                          w="700px"
                                          minH={"80vh"}
                                          mx={"auto"}
                                          p={8}
                                          bg="white"
                                          position={"absolute"}
                                          top="10%"
                                          left={chapterIndex % 2 === 0 ? "10%" : "unset"}
                                          right={chapterIndex % 2 !== 0 ? "10%" : "unset"}
                                          borderRadius="lg"
                                          shadow={"md"}
                                    >
                                          <Box flex="1" p={4} borderRadius="md" mt={10} mr={4}>
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
                                                      // Removed whiteSpace and wordBreak to allow proper HTML rendering
                                                      sx={{
                                                            // Style for paragraphs
                                                            p: {
                                                                  marginBottom: "1em",
                                                            },
                                                            // Style for unordered lists
                                                            ul: {
                                                                  paddingLeft: "1.5em",
                                                                  listStyleType: "disc",
                                                                  marginBottom: "1em",
                                                            },
                                                            // Style for ordered lists
                                                            ol: {
                                                                  paddingLeft: "1.5em",
                                                                  listStyleType: "decimal",
                                                                  marginBottom: "1em",
                                                            },
                                                            // Style for list items
                                                            li: {
                                                                  marginBottom: "0.5em",
                                                            },
                                                            // Style for headings inside the content
                                                            h1: {
                                                                  fontSize: "2xl",
                                                                  marginTop: "1.5em",
                                                                  marginBottom: "0.5em",
                                                            },
                                                            h2: {
                                                                  fontSize: "xl",
                                                                  marginTop: "1.2em",
                                                                  marginBottom: "0.5em",
                                                            },
                                                            h3: {
                                                                  fontSize: "lg",
                                                                  marginTop: "1em",
                                                                  marginBottom: "0.5em",
                                                            },
                                                            // Style for blockquotes
                                                            blockquote: {
                                                                  borderLeft: "4px solid #E2E8F0",
                                                                  paddingLeft: "1em",
                                                                  color: "gray.600",
                                                                  marginBottom: "1em",
                                                                  fontStyle: "italic",
                                                            },
                                                            // Style for images
                                                            img: {
                                                                  maxWidth: "100%",
                                                                  height: "auto",
                                                                  marginBottom: "1em",
                                                            },
                                                            // Add more styles as needed for other HTML elements
                                                      }}
                                                      dangerouslySetInnerHTML={{
                                                            __html:
                                                                  currentChapter.description || "",
                                                      }}
                                                />

                                                <HStack
                                                      justify="space-between"
                                                      align="center"
                                                      mt={4}
                                                >
                                                      <NavigationButtons
                                                            currentChapter={chapterIndex}
                                                            currentModule={currentModule}
                                                            totalChapters={chapter.length}
                                                      />
                                                      <audio
                                                            id="audio"
                                                            src="https://posh-training-lnd.s3.us-west-1.amazonaws.com/static/introPOSH.mp3"
                                                      />
                                                      <Button
                                                            leftIcon={<FaPlay />}
                                                            variant="outline"
                                                            onClick={() => {
                                                                  const audio =
                                                                        document.getElementById(
                                                                              "audio"
                                                                        ) as HTMLAudioElement;
                                                                  audio.play();
                                                            }}
                                                      >
                                                            Play
                                                      </Button>
                                                </HStack>
                                          </Box>
                                          {/* <Box flex="1" ml={4}>
                                          <ImagePreview imageUrl={currentChapter.content.url} />
                                    </Box> */}
                                    </Flex>
                              </Box>
                        );
                  default:
                        return <Text>Unsupported content type</Text>;
            }
      };

      return <>{renderContent()}</>;
};

export default DynamicContentLayout;
