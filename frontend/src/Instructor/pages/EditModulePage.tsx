// EditModulePage.tsx
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

import {
      Box,
      Button,
      Flex,
      Input,
      Stack,
      Text,
      useColorModeValue,
      Divider,
      useToast,
} from "@chakra-ui/react";
import CourseInfoForm from "../components/CourseInfoFormModule";
import ChapterForm from "../components/ChapterForm";
import Layout from "../layouts/Main";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
      getModuleById,
      getChaptersByModuleId,
      createModule,
      deleteModule,
      updateModule,
} from "../../Instructor/services/moduleService";
import SectionsList from "../components/SectionsList";
import { v4 as uuidv4 } from "uuid"; // Import UUID

interface Chapter {
      _id: string;
      title: string;
      description?: string;
      order: number;
      content?: {
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

const EditModulePage: React.FC = () => {
      const { id } = useParams();
      const location = useLocation();
      const navigate = useNavigate();
      const toast = useToast();

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
                              toast({
                                    title: "Error",
                                    description: "Failed to fetch module data.",
                                    status: "error",
                                    duration: 5000,
                                    isClosable: true,
                              });
                        }
                  };
                  fetchModuleAndChapters();
            }
      }, [id, toast]);

      useEffect(() => {
            console.log("module", module);
      }, [module]);

      // Function to handle adding a new chapter
      const addChapter = () => {
            const newChapter: Chapter = {
                  _id: generateUniqueId(), // Now using UUID
                  order: chapters.length + 1,
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

      // Function to handle reordering chapters
      const handleReorder = (newChapters: Chapter[]) => {
            console.log(
                  "Handling reorder in parent:",
                  newChapters.map((c) => c.title)
            );

            // Assign the `order` based on the current index (1-based)
            const updatedChapters = newChapters.map((chapter, index) => ({
                  ...chapter,
                  order: index + 1, // Orders start at 1
            }));

            // Update the local chapters state
            setChapters(updatedChapters);

            // Update the module's chapters array with the reordered chapters
            setModule((prevModule) => ({
                  ...prevModule,
                  chapters: updatedChapters,
            }));
      };

      // Check if this is a "new" module (i.e., /instructor/module/new)
      const isNewModule = !id || location.pathname.includes("/instructor/module/new");

      // Function to create a new module
      const createNewModule = async () => {
            try {
                  const newModule = await createModule(module);
                  console.log("New module created:", newModule);
                  toast({
                        title: "Success",
                        description: "Module created successfully.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                  });
                  navigate("/instructor/modules/manage");
            } catch (error) {
                  console.error("Error creating new module:", error);
                  toast({
                        title: "Error",
                        description: "Failed to create module.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                  });
            }
      };

      // Function to update a module
      const saveModuleChanges = async () => {
            try {
                  const updatedModule = await updateModule(id!, module);
                  console.log("Module updated:", updatedModule);
                  toast({
                        title: "Success",
                        description: "Module updated successfully.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                  });
                  navigate("/instructor/modules/manage");
            } catch (error) {
                  console.error("Error updating module:", error);
                  toast({
                        title: "Error",
                        description: "Failed to update module.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                  });
            }
      };

      // Function to delete a module
      const removeModule = async () => {
            try {
                  await deleteModule(id!);
                  toast({
                        title: "Deleted",
                        description: "Module has been deleted.",
                        status: "info",
                        duration: 5000,
                        isClosable: true,
                  });
                  navigate("/instructor/modules/manage");
            } catch (error) {
                  console.error("Error deleting module:", error);
                  toast({
                        title: "Error",
                        description: "Failed to delete module.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                  });
            }
      };

      // Function to generate a unique ID for new chapters
      const generateUniqueId = (): string => {
            return uuidv4();
      };

      // Define colors based on color mode for consistency
      const containerBg = useColorModeValue("gray.50", "gray.800");
      const formBg = useColorModeValue("white", "gray.700");
      const sectionBg = useColorModeValue("gray.100", "gray.600");
      const buttonHoverBg = useColorModeValue("teal.600", "teal.500");

      return (
            <Layout>
                  <Box p={8} bg={containerBg} minH="100vh">
                        <Text
                              fontSize={{ base: "2xl", md: "4xl" }}
                              fontWeight="bold"
                              mb={6}
                              w="fit-content"
                              color={useColorModeValue("teal.600", "teal.300")}
                        >
                              {isNewModule ? "Create New Module" : "Edit Module"}
                        </Text>
                        <Box p={4} bg={formBg} borderRadius="md" boxShadow="md">
                              <Flex
                                    direction={{ base: "column", md: "row" }}
                                    justify="space-between"
                                    align={{ base: "flex-start", md: "center" }}
                                    mb={6}
                              >
                                    <CourseInfoForm
                                          title={module?.title || ""}
                                          description={module?.description || ""}
                                          setModule={setModule}
                                          // Optionally pass other props if needed
                                    />
                              </Flex>

                              {/* Divider for visual separation */}
                              <Divider mb={6} />

                              {/* Inline Chapter Management */}
                              {isNewModule ? (
                                    <Box
                                          mt={8}
                                          p={6}
                                          bg={sectionBg}
                                          borderRadius="md"
                                          boxShadow="sm"
                                    >
                                          <Text
                                                fontSize={{ base: "xl", md: "2xl" }}
                                                fontWeight="bold"
                                                mb={4}
                                                color={"teal.600"}
                                          >
                                                Chapters
                                          </Text>
                                          <Stack spacing={6}>
                                                {chapters.map((chapter, index) => (
                                                      <ChapterForm
                                                            key={chapter._id}
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
                                                size="md"
                                                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                                          >
                                                Add Chapter
                                          </Button>
                                    </Box>
                              ) : (
                                    <SectionsList
                                          chapters={chapters}
                                          moduleId={id!}
                                          onReorder={handleReorder} // Pass the reorder handler
                                    />
                              )}

                              {/* Image Uploader */}
                              <Box mt={8}>
                                    <Text
                                          fontSize="lg"
                                          fontWeight="semibold"
                                          mb={2}
                                          color={useColorModeValue("teal.600", "teal.300")}
                                    >
                                          Module Image
                                    </Text>
                                    <Input
                                          placeholder="Image URL"
                                          value={module.imgUrl || ""}
                                          onChange={(e) =>
                                                setModule((prev) => ({
                                                      ...prev,
                                                      imgUrl: e.target.value,
                                                }))
                                          }
                                          size="md"
                                          bg={useColorModeValue("white", "gray.600")}
                                          borderColor={useColorModeValue("gray.300", "gray.500")}
                                          _hover={{ borderColor: "teal.500" }}
                                    />
                              </Box>

                              {/* Buttons */}
                              <Flex
                                    justify="space-between"
                                    mt={12}
                                    direction={{ base: "column", md: "row" }}
                                    align={{ base: "stretch", md: "center" }}
                                    gap={4}
                              >
                                    {!isNewModule && (
                                          <Button
                                                colorScheme="red"
                                                onClick={removeModule}
                                                size="md"
                                                w={{ base: "full", md: "auto" }}
                                                leftIcon={<FontAwesomeIcon icon={faTrash} />}
                                          >
                                                Delete Module
                                          </Button>
                                    )}
                                    <Flex
                                          direction={{ base: "column", md: "row" }}
                                          gap={4}
                                          w={{ base: "full", md: "auto" }}
                                    >
                                          <Button
                                                variant="outline"
                                                colorScheme="teal"
                                                mr={{ base: 0, md: 4 }}
                                                size="md"
                                                w={{ base: "full", md: "auto" }}
                                          >
                                                Save Draft
                                          </Button>
                                          <Button
                                                colorScheme="purple"
                                                onClick={
                                                      isNewModule
                                                            ? createNewModule
                                                            : saveModuleChanges
                                                }
                                                size="md"
                                                w={{ base: "full", md: "auto" }}
                                                leftIcon={
                                                      isNewModule ? (
                                                            <FontAwesomeIcon icon={faPlus} />
                                                      ) : (
                                                            <FontAwesomeIcon icon={faSave} />
                                                      )
                                                }
                                                _hover={{ bg: buttonHoverBg }}
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

export default EditModulePage;
