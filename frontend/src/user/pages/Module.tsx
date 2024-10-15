import { useEffect, useState } from "react";
import {
      Box,
      HStack,
      Text,
      Flex,
      Breadcrumb,
      BreadcrumbItem,
      BreadcrumbLink,
      Spinner,
      Center,
      useToast,
      Grid,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import Layout from "../layouts/Main";
import { getModuleById, getChapterById } from "../services/moduleService";

interface Chapter {
      title: string;
      description: string;
      content: {
            type: "video" | "text";
            url: string;
      };
      order: number;
      _id: string;
}

interface ModuleData {
      title: string;
      description: string;
      _id: string;
}

const Module = () => {
      const { id } = useParams<{ id: string }>();
      const navigate = useNavigate();
      const toast = useToast();

      const [chapters, setChapters] = useState<Chapter[]>([]);
      const [currentModule, setCurrentModule] = useState<ModuleData | null>(null);
      const [isLoading, setIsLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
            const fetchModule = async () => {
                  try {
                        setIsLoading(true);
                        if (!id) {
                              throw new Error("Module ID is missing.");
                        }

                        const _module = await getModuleById(id);
                        if (!_module) {
                              throw new Error("Module not found.");
                        }

                        const _chapters = await getChapterById(_module._id);
                        setCurrentModule(_module);
                        setChapters(_chapters);
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  } catch (err: any) {
                        console.error("Error fetching module:", err);
                        setError(err.message || "An unexpected error occurred.");
                        toast({
                              title: "Error",
                              description: err.message || "Failed to load module.",
                              status: "error",
                              duration: 5000,
                              isClosable: true,
                        });
                  } finally {
                        setIsLoading(false);
                  }
            };

            fetchModule();
      }, [id, toast]);

      if (isLoading) {
            return (
                  <Layout>
                        <Center h="100vh">
                              <Spinner size="xl" />
                        </Center>
                  </Layout>
            );
      }

      if (error) {
            return (
                  <Layout>
                        <Center h="100vh">
                              <Text color="red.500" fontSize="xl">
                                    {error}
                              </Text>
                        </Center>
                  </Layout>
            );
      }

      return (
            <Layout>
                  <Box maxW="1200px" my={10} px={5} mx="auto">
                        {/* Breadcrumbs */}
                        <Breadcrumb separator=">">
                              <BreadcrumbItem>
                                    <BreadcrumbLink
                                          onClick={() => navigate("/dashboard")}
                                          cursor="pointer"
                                          _hover={{ textDecoration: "underline" }}
                                    >
                                          <Text fontSize="lg">Home</Text>
                                    </BreadcrumbLink>
                              </BreadcrumbItem>

                              <BreadcrumbItem isCurrentPage>
                                    <BreadcrumbLink>
                                          <Text fontSize="lg" fontWeight="bold">
                                                {currentModule?.title}
                                          </Text>
                                    </BreadcrumbLink>
                              </BreadcrumbItem>
                        </Breadcrumb>

                        <Flex
                              direction={{ base: "column", md: "row" }}
                              w="full"
                              justify="space-between"
                              mt={8}
                        >
                              <Box flex="1" w="full">
                                    <HStack justify="space-between" mb={5}>
                                          <Text fontSize="2xl" fontWeight="bold">
                                                {currentModule?.title}
                                          </Text>
                                    </HStack>

                                    <Box
                                          // bgColor="white"
                                          fontSize="lg"
                                          mb={8}
                                          py={6}
                                          color="gray.700"
                                          dangerouslySetInnerHTML={{
                                                __html: currentModule?.description || "",
                                          }}
                                    />

                                    {chapters.length > 0 ? (
                                          <Grid
                                                w={"100%"}
                                                templateColumns="repeat(3, minmax(150px, 1fr))"
                                                gap={10}
                                                mt={14}
                                          >
                                                {chapters.map((chapter, index) => (
                                                      <VideoCard
                                                            key={chapter._id}
                                                            moduleId={id!}
                                                            due={
                                                                  new Date()
                                                                        .toISOString()
                                                                        .split("T")[0]
                                                            } // Replace with actual due date if available
                                                            title={chapter.title}
                                                            image={chapter.content.url}
                                                            progress={Math.round(
                                                                  ((index + 1) / chapters.length) *
                                                                        100
                                                            )}
                                                            completion="completed" // Replace with actual completion status if available
                                                            onClick={() =>
                                                                  navigate(
                                                                        `/learnings/module/${id}/content/${chapter.order}`
                                                                  )
                                                            }
                                                      />
                                                ))}
                                          </Grid>
                                    ) : (
                                          <Text>No chapters available.</Text>
                                    )}
                              </Box>
                        </Flex>
                  </Box>
            </Layout>
      );
};

export default Module;
