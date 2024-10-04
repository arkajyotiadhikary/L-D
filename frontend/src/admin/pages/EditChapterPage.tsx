import { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import CourseInfoForm from "../components/CourseInfoForm";
import VideoUploader from "../components/VideoUploader";
import Layout from "../layouts/Main";

import { useParams } from "react-router-dom";
import { getChapterById } from "../services/moduleService";

const EditCoursePage: React.FC = () => {
      const { id } = useParams();

      const [chapter, setChapter] = useState<{
            _id?: string;
            title?: string;
            description?: string;
            order?: number;
            imgUrl?: string;
      }>({});

      useEffect(() => {
            console.log("module", id);
            // Get course by id
            const fetchChapter = async () => {
                  try {
                        const _chapter = await getChapterById(id!);
                        setChapter(_chapter);
                        console.log("chapter", _chapter);
                  } catch (error) {
                        console.error("Error fetching chapter:", error);
                  }
            };

            fetchChapter();
      }, [id]);

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
                                          <CourseInfoForm
                                                title={chapter.title!}
                                                description={chapter.description!}
                                                setModule={setChapter}
                                          />
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
