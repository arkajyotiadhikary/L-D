import React from "react";
import { Card, CardBody, Text, Box, Image, Button, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

interface VideoCardProps {
      title: string;
      image: string;
      moduleId: string;
      due: string;
      progress: number;
      completion: "completed" | "progress" | "incomplete";
      onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, image, due, completion, onClick }) => {
      const isClickable = completion !== "incomplete";

      return (
            <Card maxW="sm" overflow="hidden" boxShadow="md" borderRadius="3xl" position="relative">
                  <CardBody p={0}>
                        {/* Header Section */}
                        <Box p={6}>
                              <Text fontSize="2xl" mt={1} noOfLines={1}>
                                    {title}
                              </Text>
                        </Box>

                        {/* Image Section */}
                        <Box position="relative">
                              <Image
                                    src={image}
                                    alt={`${title} image`}
                                    width="500px"
                                    h="300px"
                                    objectFit="cover"
                              />
                        </Box>

                        {/* Footer Section */}
                        <Box
                              position="absolute"
                              bottom={0}
                              left={0}
                              right={0}
                              p={4}
                              color={"white"}
                              bg="rgba(255, 255, 255, 0.72)"
                              backdropFilter="blur(5px)"
                        >
                              <Flex justify="space-between" align="center">
                                    <Text fontSize="sm">Due on {due}</Text>
                                    <Button
                                          leftIcon={<FontAwesomeIcon icon={faPlay} />}
                                          variant="ghost"
                                          onClick={isClickable ? onClick : undefined}
                                          _hover={{
                                                textDecoration: "none",
                                                bg: "rgba(255, 255, 255, 0.3)",
                                          }}
                                          aria-label="Resume Learning"
                                    >
                                          Resume
                                    </Button>
                              </Flex>
                        </Box>
                  </CardBody>
            </Card>
      );
};

export default VideoCard;
