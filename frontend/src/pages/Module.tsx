import { getModuleById, getChapterById } from "../services/moduleService";
import { useEffect, useState } from "react";
import { Box, HStack, Button, Text, Flex } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import CourseInfo from "../components/CourseInfo";
import VideoCard from "../components/VideoCard";
import Layout from "../layouts/Main";

const Module = () => {
      const { id } = useParams();
      const navigate = useNavigate();

      const [chapters, setChapters] = useState<
            Array<{
                  title: string;
                  description: string;
                  content: { type: "video" | "text"; url: string };
            }>
      >([]);

      const [currentModule, setCurrentModule] = useState<{
            title: string;
            details: string;
      } | null>(null);

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

      return (
            <Layout>
                  <Box p={5}>
                        <Text fontSize="2xl" fontWeight="bold">
                              {currentModule ? currentModule.title : "Module"}
                        </Text>
                  </Box>

                  <Flex>
                        <Box flex="1" p={8} bg="gray.50">
                              <HStack justify="space-between" mb={5}>
                                    <Text fontSize="2xl" fontWeight="bold">
                                          {currentModule?.title}
                                    </Text>
                              </HStack>

                              <Text mb={4}>{currentModule?.details}</Text>

                              {chapters?.length > 0 ? (
                                    chapters.map((chapter, index) => (
                                          <VideoCard
                                                key={index}
                                                title={chapter.title}
                                                description={chapter.description}
                                                content={chapter.content} // Pass the content field
                                                progress={index + 1}
                                                completed={index === 2}
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

                        <Box w="300px" ml={4}>
                              <CourseInfo />
                        </Box>
                  </Flex>
            </Layout>
      );
};

export default Module;
