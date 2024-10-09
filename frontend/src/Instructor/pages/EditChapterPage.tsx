import { useState, useEffect, useCallback } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import CourseInfoForm from "../components/CourseInfoFormChapter";
import VideoUploader from "../components/VideoUploader";
import Layout from "../layouts/Main";
import { useParams, useNavigate } from "react-router-dom";
import {
      getChapterById,
      createChapter,
      updateChapter,
} from "../../Instructor/services/moduleService";

interface ChapterType {
      _id?: string;
      title?: string;
      description?: string;
      content: {
            type: "text" | "video";
            url: string;
      };
}

const EditCoursePage: React.FC = () => {
      const { id, moduleId } = useParams();
      const [chapter, setChapter] = useState<ChapterType>({
            title: "",
            description: "",
            content: { type: "text", url: "" },
      });

      const navigate = useNavigate();

      useEffect(() => {
            const fetchChapter = async () => {
                  if (id) {
                        try {
                              const _chapter = await getChapterById(id);
                              setChapter(_chapter);
                              console.log("Fetched chapter", _chapter);
                        } catch (error) {
                              console.error("Error fetching chapter:", error);
                        }
                  }
            };
            fetchChapter();
      }, [id]);

      const setModule = useCallback(
            (module: Partial<ChapterType>) => {
                  setChapter((prevState) => ({
                        ...prevState,
                        ...module,
                  }));
            },
            [setChapter]
      );

      const handleSaveChanges = async () => {
            if (id) {
                  try {
                        const updatedChapter = await updateChapter(id, chapter);
                        console.log("updatedChapter", updatedChapter);
                        if (updatedChapter) {
                              navigate(`/instructor/module/edit/${moduleId}`);
                        }
                  } catch (error) {
                        console.error("Error updating chapter:", error);
                  }
            }
      };

      const handleCreateChapter = async () => {
            try {
                  const newChapter = await createChapter(chapter, moduleId!);
                  console.log("newChapter", newChapter);
                  if (newChapter) {
                        navigate(`/instructor/module/edit/${moduleId}`);
                  }
            } catch (error) {
                  console.error("Error creating chapter:", error);
            }
      };

      return (
            <Layout>
                  <Box p={8} bg="white">
                        <Text fontSize="4xl" fontWeight="bold" mb={4} w="fit-content">
                              {id ? "Edit Chapter" : "Create New Chapter"}
                        </Text>
                        <Box p={4}>
                              <Flex justify="space-between">
                                    <Box width="60%">
                                          <CourseInfoForm
                                                title={chapter.title || ""}
                                                description={chapter.description || ""}
                                                url={chapter.content.url || ""}
                                                setModule={setModule}
                                          />
                                    </Box>
                                    <Box width="35%">
                                          <VideoUploader />
                                    </Box>
                              </Flex>
                              <Flex justify="space-between" mt={8}>
                                    {id && <Button colorScheme="red">Delete Course</Button>}
                                    <Flex>
                                          <Button variant="outline" mr={4}>
                                                Save Draft
                                          </Button>
                                          <Button
                                                colorScheme="purple"
                                                onClick={
                                                      id ? handleSaveChanges : handleCreateChapter
                                                }
                                          >
                                                {id ? "Save Changes" : "Create Chapter"}
                                          </Button>
                                    </Flex>
                              </Flex>
                        </Box>
                  </Box>
            </Layout>
      );
};

export default EditCoursePage;
