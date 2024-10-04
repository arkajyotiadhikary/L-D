import { useState, useEffect } from "react";
import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import CourseInfoForm from "../components/CourseInfoForm";
import VideoUploader from "../components/VideoUploader";
import ChapterForm from "../components/ChapterForm";
import Layout from "../layouts/Main";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
      getModuleById,
      getChaptersByModuleId,
      createModule,
      deleteModule,
      updateModule,
} from "../services/moduleService";
import SectionsList from "../components/SectionsList";

interface Chapter {
      _id?: string;
      title?: string;
      description?: string;
      content: {
            type: "text" | "video";
            url: string;
      };
}

interface Module {
      _id?: string;
      title?: string;
      description?: string;
      order?: number;
      imgUrl?: string;
      chapters?: Chapter[];
}

const EditCoursePage: React.FC = () => {
      const { id } = useParams();
      const location = useLocation();
      const navigate = useNavigate();

      const [module, setModule] = useState<Module>({
            title: "",
            description: "",
            imgUrl: "",
            chapters: [],
      });

      const [chapters, setChapters] = useState<Chapter[]>([]);

      useEffect(() => {
            if (id) {
                  // Fetch the module and chapters if ID exists
                  const fetchModuleAndChapters = async () => {
                        try {
                              const [_module, _chapters] = await Promise.all([
                                    getModuleById(id!),
                                    getChaptersByModuleId(id!),
                              ]);
                              setModule({ ..._module, chapters: _chapters });
                              setChapters(_chapters);
                        } catch (error) {
                              console.error("Error fetching module and chapters:", error);
                        }
                  };
                  fetchModuleAndChapters();
            }
      }, [id]);

      // Function to handle adding a new chapter
      const addChapter = () => {
            const newChapter: Chapter = {
                  title: "",
                  description: "",
                  content: { type: "text", url: "" },
            };
            setChapters((prevChapters) => {
                  const updatedChapters = [...prevChapters, newChapter];
                  setModule((prevModule) => ({
                        ...prevModule,
                        chapters: updatedChapters,
                  }));
                  return updatedChapters;
            });
      };

      // Function to update chapter data
      const updateChapter = (index: number, updatedChapter: Chapter) => {
            const updatedChapters = [...chapters];
            updatedChapters[index] = updatedChapter;
            setChapters(updatedChapters);
            // Also update the module's chapters
            setModule((prevModule) => ({
                  ...prevModule,
                  chapters: updatedChapters,
            }));
      };

      // Function to remove a chapter
      const removeChapter = (index: number) => {
            const updatedChapters = chapters.filter((_, i) => i !== index);
            setChapters(updatedChapters);
            // Also update the module's chapters
            setModule((prevModule) => ({
                  ...prevModule,
                  chapters: updatedChapters,
            }));
      };

      // Check if this is a "new" module (i.e., /admin/module/new)
      const isNewModule = !id || location.pathname.includes("/admin/module/new");

      // Function to create a new module
      const createNewModule = async () => {
            try {
                  const newModule = await createModule(module);
                  console.log("New module created:", newModule);
                  navigate("/admin/modules/manage");
            } catch (error) {
                  console.error("Error creating new module:", error);
            }
      };

      // Function to update a module
      const saveModuleChanges = async () => {
            try {
                  const updatedModule = await updateModule(id!, module);
                  console.log("Module updated:", updatedModule);
                  navigate("/admin/modules/manage");
            } catch (error) {
                  console.error("Error updating module:", error);
            }
      };

      // Function to delete a module
      const removeModule = async () => {
            try {
                  await deleteModule(id!);
                  navigate("/admin/modules/manage");
            } catch (error) {
                  console.error("Error deleting module:", error);
            }
      };

      return (
            <Layout>
                  <Box p={8} bg={"white"}>
                        <Text fontSize="4xl" fontWeight="bold" mb={4} w="fit-content">
                              {isNewModule ? "Create New Module" : "Edit Module"}
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
                                    {!isNewModule && (
                                          <Box width="35%">
                                                <VideoUploader />
                                          </Box>
                                    )}
                              </Flex>

                              {/* Inline Chapter Management */}
                              {isNewModule ? (
                                    <Box
                                          mt={8}
                                          p={4}
                                          bg="white"
                                          borderWidth="1px"
                                          borderRadius="md"
                                          boxShadow="md"
                                    >
                                          <Text fontSize="2xl" fontWeight="bold" mb={4}>
                                                Chapters
                                          </Text>
                                          <Stack spacing={4}>
                                                {chapters.map((chapter, index) => (
                                                      <ChapterForm
                                                            key={index}
                                                            index={index}
                                                            chapter={chapter}
                                                            updateChapter={updateChapter}
                                                            removeChapter={removeChapter}
                                                      />
                                                ))}
                                          </Stack>
                                          <Button
                                                colorScheme="teal"
                                                mt={4}
                                                onClick={addChapter}
                                                size="sm"
                                          >
                                                Add Chapter
                                          </Button>
                                    </Box>
                              ) : (
                                    <SectionsList chapters={chapters} />
                              )}

                              {/* Image Uploader */}
                              <Box mt={8}>
                                    <Input
                                          placeholder="Image URL"
                                          value={module.imgUrl || ""}
                                          onChange={(e) =>
                                                setModule((prev) => ({
                                                      ...prev,
                                                      imgUrl: e.target.value,
                                                }))
                                          }
                                    />
                              </Box>

                              {/* Buttons */}
                              <Flex justify="space-between" mt={8}>
                                    {!isNewModule && (
                                          <Button colorScheme="red" onClick={removeModule}>
                                                Delete Module
                                          </Button>
                                    )}
                                    <Flex>
                                          <Button variant="outline" mr={4}>
                                                Save Draft
                                          </Button>
                                          <Button
                                                colorScheme="purple"
                                                onClick={
                                                      isNewModule
                                                            ? createNewModule
                                                            : saveModuleChanges
                                                }
                                          >
                                                {isNewModule ? "Create Module" : "Save Changes"}
                                          </Button>
                                    </Flex>
                              </Flex>
                        </Box>
                  </Box>
            </Layout>
      );
};

export default EditCoursePage;
