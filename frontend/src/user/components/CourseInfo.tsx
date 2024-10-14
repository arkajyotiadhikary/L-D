import React from "react";
import { Box, VStack, Text, Button, Flex, Divider, Badge } from "@chakra-ui/react";
import VideoPreview from "./VideoPreview";
import { useNavigate } from "react-router-dom";

const CourseInfo = () => {
      const navigate = useNavigate();

      return (
            <Box borderRadius="lg" boxShadow="md" overflow="hidden">
                  <VStack bg="white" spacing={0}>
                        <VideoPreview
                              height="200px"
                              videoUrl="https://www.youtube.com/watch?v=ysz5S6PmrZQ"
                              title="Module 1: Introduction"
                        />

                        <Box p={6} width="100%">
                              <Flex justifyContent="space-between" alignItems="center" mb={4}>
                                    <Badge colorScheme="green" fontSize="md" px={2} py={1}>
                                          Completed
                                    </Badge>
                                    <Button
                                          variant="solid"
                                          color={"white"}
                                          bgGradient="linear(to-r, blue.500, purple.500)"
                                          size="sm"
                                          onClick={() => navigate("/learnings/module/1/content/1")}
                                    >
                                          Review Course
                                    </Button>
                              </Flex>

                              <VStack spacing={3} align="start">
                                    <Flex justify="space-between" width="100%">
                                          <Text fontWeight="medium">Duration:</Text>
                                          <Text>1h 7m</Text>
                                    </Flex>
                                    <Flex justify="space-between" width="100%">
                                          <Text fontWeight="medium">Delivery Mode:</Text>
                                          <Text>Self-Directed</Text>
                                    </Flex>
                                    <Flex justify="space-between" width="100%">
                                          <Text fontWeight="medium">Lessons:</Text>
                                          <Text>9</Text>
                                    </Flex>
                              </VStack>
                        </Box>

                        <Divider />

                        <Box p={6} width="100%" textAlign="center">
                              <Text mb={2}>Assignment Score:</Text>
                              <Text fontSize="3xl" color="black">
                                    0.0/70
                              </Text>
                        </Box>
                  </VStack>
            </Box>
      );
};

export default CourseInfo;
