import { Box, HStack, Button, Text, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CourseInfo from "../components/CourseInfo";
import VideoCard from "../components/VideoCard";
import Layout from "../layouts/Main";

const Module = () => {
      const navigate = useNavigate();

      return (
            <Layout>
                  <Box p={5}>
                        <Text fontSize="2xl" fontWeight="bold">
                              Module 1
                        </Text>
                  </Box>

                  <Flex>
                        <Box flex="1" p={8} bg="gray.50">
                              <HStack justify="space-between" mb={5}>
                                    <Text fontSize="2xl" fontWeight="bold">
                                          Anti Harassment & Discrimination
                                    </Text>
                              </HStack>

                              <Text mb={4}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                    nulla pariatur.Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                              </Text>

                              {/* Videos List */}
                              <VideoCard
                                    title="Video 1"
                                    progress={50}
                                    completed={false}
                                    onClick={() => navigate("/module/1/content/1")}
                              />
                              <VideoCard
                                    title="Video 2"
                                    progress={0}
                                    completed={false}
                                    onClick={() => navigate("/module/1/content/2")}
                              />

                              <Flex>
                                    <Button mt={4} colorScheme="teal" size="sm" w="20%" mx="auto">
                                          Take an Assignment
                                    </Button>
                              </Flex>
                        </Box>

                        {/* Course Info Section */}
                        <Box w="300px" bg="gray.50" ml={4}>
                              <CourseInfo />
                        </Box>
                  </Flex>
            </Layout>
      );
};

export default Module;
