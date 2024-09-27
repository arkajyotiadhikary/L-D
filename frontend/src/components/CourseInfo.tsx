import { Box, VStack, Text, Button } from "@chakra-ui/react";
import VideoPreview from "./VideoPreview";
import { useNavigate } from "react-router-dom";

const CourseInfo = () => {
      const navigate = useNavigate();
      return (
            <Box borderRadius="md">
                  <VStack bg={"white"}>
                        <VideoPreview
                              height="300px"
                              videoUrl="https://www.youtube.com/watch?v=ysz5S6PmrZQ"
                              title="Module 1: Introduction"
                        />
                        <Button
                              variant="solid"
                              colorScheme="blue"
                              size="sm"
                              my={3}
                              w="1/5"
                              rounded="md"
                              onClick={() => navigate("/module/1/content/1")}
                        >
                              View Course Again
                        </Button>
                        <VStack spacing={2} align="start" my={3}>
                              <Text>
                                    Status:
                                    <Text as="span" color="green.500" ml={2}>
                                          Completed
                                    </Text>
                              </Text>
                              <Text>Duration: 1h 7m</Text>
                              <Text>Delivery Mode: Self-Directed</Text>
                              <Text>Lessons: 9</Text>
                        </VStack>
                  </VStack>

                  <VStack mt={10} bg={"white"} align={"center"} justify={"center"} p={10}>
                        <Box>
                              <Text fontWeight="bold">Assignment Score:</Text>
                        </Box>
                        <Box mt={2}>
                              <Text fontSize="2xl">0.0/70</Text>
                        </Box>
                  </VStack>
            </Box>
      );
};

export default CourseInfo;
