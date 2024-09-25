import { Box, HStack, Avatar, Button, Text, Flex } from "@chakra-ui/react";
import CourseInfo from "../components/CourseInfo";
import VideoCard from "../components/VideoCard";
import Layout from "../layouts/Main";

const Module = () => {
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
                                    nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                              </Text>

                              {/* Videos List */}
                              <VideoCard title="Video 1" progress={50} completed={false} />
                              <VideoCard title="Video 2" progress={0} completed={false} />

                              <Button mt={4} colorScheme="teal" w="100%">
                                    Take an Assignment
                              </Button>
                        </Box>

                        {/* Course Info Section */}
                        <Box w="300px" p={5} bg="gray.50" ml={4}>
                              <CourseInfo />
                        </Box>
                  </Flex>
            </Layout>
      );
};

export default Module;
