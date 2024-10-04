import { Box, Button, Flex, Text } from "@chakra-ui/react";
import CourseInfoForm from "../components/CourseInfoForm";
import VideoUploader from "../components/VideoUploader";
import Layout from "../layouts/Main";

const EditCoursePage: React.FC = () => {
      return (
            <Layout>
                  <Box p={8} bg={"white"}>
                        <Text fontSize="4xl" fontWeight="bold" mb={4} w="fit-content">
                              Edit Chapter
                        </Text>
                        <Box p={4}>
                              <Flex justify="space-between">
                                    {/* Left Side - Course Information */}
                                    <Box width="60%">
                                          <CourseInfoForm />
                                    </Box>

                                    {/* Right Side - Video Uploader */}
                                    <Box width="35%">
                                          <VideoUploader />
                                    </Box>
                              </Flex>

                              {/* Buttons */}
                              <Flex justify="space-between" mt={8}>
                                    <Button colorScheme="red">Delete Course</Button>
                                    <Flex>
                                          <Button variant="outline" mr={4}>
                                                Save Draft
                                          </Button>
                                          <Button colorScheme="purple">Save Changes</Button>
                                    </Flex>
                              </Flex>
                        </Box>
                  </Box>
            </Layout>
      );
};

export default EditCoursePage;
