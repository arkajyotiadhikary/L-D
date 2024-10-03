import { getModuleById, getChapterById } from "../services/moduleService";
import { useEffect, useState } from "react";
import { Box, HStack, Button, Text, Flex } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import CourseInfo from "../components/CourseInfo";
import VideoCard from "../components/VideoCard";
import Layout from "../layouts/Main";
import useUserStore from "../store"; // Assuming Zustand store is here

const Module = () => {
      const { id } = useParams();
      const navigate = useNavigate();

      const [chapters, setChapters] = useState<
            Array<{
                  title: string;
                  description: string;
                  content: { type: "video" | "text"; url: string };
                  _id: string; // Assume chapters have an _id to track progress
            }>
      >([]);
      const [currentModule, setCurrentModule] = useState<{
            title: string;
            details: string;
      } | null>(null);

      const { user } = useUserStore(); // Access user state from Zustand store

      useEffect(() => {
            const fetchModule = async () => {
                  try {
                        const _module = await getModuleById(id!);
                        const _chapters = await getChapterById(_module._id!);
                        setCurrentModule(_module);
                        setChapters(_chapters);
                  } catch (error) {
                        console.error("Error fetching module:", error);
                  }
            };

            fetchModule();
      }, [id]);

      // Helper function to get the user's progress for this module
      const getModuleProgress = () => {
            return user?.moduleProgress.find((progress) => progress.moduleId === id);
      };

      // Helper function to determine chapter completion status
      const getChapterCompletionStatus = (chapterId: string, index: number) => {
            const moduleProgress = getModuleProgress();

            // If no progress, mark the first chapter as "progress"
            if (!moduleProgress) {
                  return index === 0 ? "progress" : "incomplete";
            }

            const { chapterProgress, currentChapterId } = moduleProgress;

            const chapterProgressItem = chapterProgress.find(
                  (progress) => progress.chapterId === chapterId
            );

            // Check if chapter is completed
            if (chapterProgressItem && chapterProgressItem.completed) {
                  return "completed";
            }

            // If currentChapterId is null, make the first chapter as "progress"
            if (!currentChapterId && index === 0) {
                  return "progress";
            }

            // If the chapter matches the current one in progress
            if (currentChapterId === chapterId) {
                  return "progress";
            }

            return "incomplete";
      };
      return (
            <Layout>
                  <Box p={5}>
                        <Text fontSize="2xl" fontWeight="bold">
                              {`Module ${id}`}
                        </Text>
                  </Box>

                  <Flex direction={{ base: "column", md: "row" }} w="full" justify="space-between">
                        <Box flex="1" p={8} bg="gray.50" w="full" order={{ base: 2, md: 1 }}>
                              <HStack justify="space-between" mb={5}>
                                    <Text fontSize="2xl" fontWeight="bold">
                                          {currentModule?.title}
                                    </Text>
                              </HStack>

                              <Text mb={4}>{currentModule?.details}</Text>

                              {chapters?.length > 0 ? (
                                    chapters.map((chapter, index) => (
                                          <VideoCard
                                                key={chapter._id}
                                                title={chapter.title}
                                                description={chapter.description}
                                                content={chapter.content}
                                                progress={index + 1}
                                                completion={getChapterCompletionStatus(
                                                      chapter._id,
                                                      index
                                                )}
                                                onClick={() =>
                                                      navigate(`/module/${id}/content/${index + 1}`)
                                                }
                                          />
                                    ))
                              ) : (
                                    <Text>No chapters available.</Text>
                              )}

                              <Flex>
                                    <Button
                                          mt={4}
                                          size="sm"
                                          w="20%"
                                          mx="auto"
                                          colorScheme="purple"
                                          variant="solid"
                                          _hover={{ bg: "purple.600" }}
                                          onClick={() => navigate(`/module/${id}/assignment/1`)}
                                    >
                                          Take an Assignment
                                    </Button>
                              </Flex>
                        </Box>

                        <Box ml={4} w={{ base: "full", md: "400px" }} order={{ base: 1, md: 2 }}>
                              <CourseInfo />
                        </Box>
                  </Flex>
            </Layout>
      );
};

export default Module;
