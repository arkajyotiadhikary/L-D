import React from "react";
import { Card, CardBody, Text, Box, Image, Button, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface VideoCardProps {
      title: string;
      description: string;
      image: string;
      moduleId: string;
      due: string;
      progress: number;
      completion: "completed" | "progress" | "incomplete";
}

const WatchAndLearnCard: React.FC<VideoCardProps> = ({
      title,
      description,
      image,
      moduleId,
      due,
      progress,
      completion,
}) => {
      const navigate = useNavigate();
      const isClickable = completion !== "incomplete";
      return (
            <Card
                  maxW="sm"
                  overflow="hidden"
                  boxShadow="md"
                  borderRadius="lg"
                  onClick={() => isClickable && navigate(`/learnings/module/${moduleId}`)}
            >
                  <CardBody p={0}>
                        {/* Header Section */}
                        <Box bg="blue.50" p={4}>
                              <Text
                                    fontSize="sm"
                                    color="blue.600"
                                    fontWeight="semibold"
                                    textTransform="uppercase"
                              >
                                    Watch & Learn
                              </Text>
                              <Text fontSize="2xl" fontWeight="bold" mt={1} noOfLines={1}>
                                    {title}
                              </Text>
                        </Box>

                        {/* Image Section */}
                        <Box position="relative">
                              <Image
                                    src={image}
                                    alt={`${title} image`}
                                    width="100%"
                                    height="48"
                                    objectFit="cover"
                              />
                              <Box
                                    position="absolute"
                                    top={2}
                                    left={2}
                                    bg="blackAlpha.60"
                                    color="white"
                                    px={2}
                                    py={1}
                                    borderRadius="md"
                              >
                                    <Text fontSize="sm">{progress}</Text>
                              </Box>
                        </Box>

                        {/* Footer Section */}
                        <Box p={4} bg="transparent">
                              <Flex justify="space-between" align="center">
                                    <Text fontSize="sm" color="gray.600">
                                          Due on {due}
                                    </Text>
                                    <Button
                                          leftIcon={<FontAwesomeIcon icon={faPlay} />}
                                          variant="ghost"
                                          colorScheme="blue"
                                          onClick={(e) => {
                                                e.stopPropagation(); // Prevent card click if nested within a clickable parent
                                          }}
                                          _hover={{ textDecoration: "none", bg: "transparent" }}
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

export default WatchAndLearnCard;
