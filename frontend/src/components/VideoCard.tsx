import { Box, HStack, Button, Progress, Text, Flex, Center, Image, Badge } from "@chakra-ui/react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VideoCard = ({
      title,
      progress,
      completion,
      content,
      onClick,
}: {
      title: string;
      description: string;
      content: { type: "video" | "text"; url: string };
      progress: number;
      completion?: "completed" | "progress" | "incomplete";
      onClick: () => void;
}) => (
      <HStack
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            mb={4}
            boxShadow="sm"
            transition="all 0.2s"
            _hover={{
                  cursor: completion === "incomplete" ? "not-allowed" : "pointer",
                  boxShadow: completion === "incomplete" ? "sm" : "md",
            }}
            onClick={completion === "incomplete" ? undefined : onClick}
      >
            <Image
                  src={content.url}
                  alt="Thumbnail"
                  borderRadius="md"
                  boxSize="80px"
                  mr={4}
                  objectFit={"cover"}
            />
            <Box w={"full"}>
                  <Flex justify="space-between" align="center" mb={3}>
                        <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
                              {title}
                        </Text>
                        <HStack>
                              <Badge
                                    fontSize="sm"
                                    fontWeight="medium"
                                    colorScheme={"green"}
                                    variant="outline"
                                    borderRadius="md"
                                    px={2}
                                    py={1}
                              >
                                    {progress}%
                              </Badge>

                              <Button
                                    size="sm"
                                    // colorScheme={completion === "completed" ? "green" : "blue"}
                                    colorScheme="gray"
                                    _disabled={{ bgColor: "gray.200" }}
                                    variant="outline"
                                    isDisabled={completion === "incomplete"}
                              >
                                    <Center>
                                          <FontAwesomeIcon
                                                icon={faPlay}
                                                style={{
                                                      verticalAlign: "middle",
                                                      marginRight: "5px",
                                                }}
                                          />
                                          {completion === "completed" ? "Review" : "Start"}
                                    </Center>
                              </Button>
                        </HStack>
                  </Flex>

                  <HStack spacing={3} align="center">
                        <Progress
                              value={progress}
                              flex="1"
                              size="sm"
                              // colorScheme={completion === "completed" ? "green" : "blue"}
                              colorScheme="green"
                              borderRadius="full"
                        />
                  </HStack>
            </Box>
      </HStack>
);

export default VideoCard;
