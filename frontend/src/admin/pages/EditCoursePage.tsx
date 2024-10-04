import { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import CourseInfoForm from "../components/CourseInfoForm";
import SectionsList from "../components/SectionsList";
import VideoUploader from "../components/VideoUploader";
import Layout from "../layouts/Main";

import { useParams } from "react-router-dom";
import { getModuleById, getChaptersByModuleId } from "../services/moduleService";

const EditCoursePage: React.FC = () => {
      const { id } = useParams();

      const [module, setModule] = useState<{
            _id?: string;
            title?: string;
            description?: string;
            order?: number;
            imgUrl?: string;
      } | null>(null);

      const [chapters, setChapters] = useState([]);

      useEffect(() => {
            console.log("module", id);
            // Get course by id
            const fetchModuleAndChapters = async () => {
                  try {
                        const [_module, _chapters] = await Promise.all([
                              getModuleById(id!),
                              getChaptersByModuleId(id!),
                        ]);
                        setModule(_module);
                        setChapters(_chapters);
                        console.log(_module, _chapters);
                  } catch (error) {
                        console.error("Error fetching module and chapters:", error);
                  }
            };

            fetchModuleAndChapters();
      }, [id]);

      return (
            <Layout>
                  <Box p={8} bg={"white"}>
                        <Text fontSize="4xl" fontWeight="bold" mb={4} w="fit-content">
                              Edit Course
                        </Text>
                        <Box p={4}>
                              <Flex justify="space-between">
                                    {/* Left Side - Course Information */}
                                    <Box width="60%">
                                          <CourseInfoForm
                                                title={module?.title || ""}
                                                description={module?.description || ""}
                                                setModule={setModule}
                                          />
                                    </Box>

                                    {/* Right Side - Video Uploader */}
                                    <Box width="35%">
                                          <VideoUploader />
                                    </Box>
                              </Flex>

                              {/* Sections */}
                              <SectionsList chapters={chapters} />

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
