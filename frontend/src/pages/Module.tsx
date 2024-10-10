import { getModuleById, getChapterById } from "../services/moduleService";
import { useEffect, useState } from "react";
import {
      Box,
      HStack,
      Text,
      Flex,
      Breadcrumb,
      BreadcrumbItem,
      BreadcrumbLink,
} from "@chakra-ui/react";
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
                  content: {
                        type: "video" | "text";
                        url: string;
                  };
                  _id: string;
            }>
      >([]);
      const [currentModule, setCurrentModule] = useState<{
            title: string;
            description: string;
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
                  <Box px={5} py={2}>
                        {/* Breadcrumbs */}
                        <Breadcrumb separator=">" mt={6}>
                              <BreadcrumbItem>
                                    <BreadcrumbLink onClick={() => navigate("/dashboard")}>
                                          <Text
                                                fontSize="lg"
                                                fontWeight="semibold"
                                                color="blue.600"
                                          >
                                                Home
                                          </Text>
                                    </BreadcrumbLink>
                              </BreadcrumbItem>
                              <BreadcrumbItem isCurrentPage>
                                    <BreadcrumbLink>
                                          <Text
                                                fontSize="lg"
                                                fontWeight="semibold"
                                                color="blue.800"
                                          >
                                                {currentModule?.title}
                                          </Text>
                                    </BreadcrumbLink>
                              </BreadcrumbItem>
                        </Breadcrumb>

                        <Box p={5}>
                              <Text fontSize="2xl" fontWeight="bold"></Text>
                        </Box>

                        <Flex
                              direction={{ base: "column", md: "row" }}
                              w="full"
                              justify="space-between"
                        >
                              <Box flex="1" p={8} bg="gray.50" w="full" order={{ base: 2, md: 1 }}>
                                    <HStack justify="space-between" mb={5}>
                                          <Text fontSize="2xl" fontWeight="bold" color="blue.700">
                                                {currentModule?.title}
                                          </Text>
                                    </HStack>

                                    <Box
                                          fontSize="larger"
                                          mb={5}
                                          color="gray.700"
                                          dangerouslySetInnerHTML={{
                                                __html: currentModule?.description || "",
                                          }}
                                    />
                                    {chapters?.length > 0 ? (
                                          chapters.map((chapter, index) => (
                                                <VideoCard
                                                      key={chapter._id}
                                                      title={chapter.title}
                                                      description={chapter.description}
                                                      content={chapter.content}
                                                      progress={index + 1}
                                                      completion="completed"
                                                      onClick={() =>
                                                            navigate(
                                                                  `/learnings/module/${id}/content/${
                                                                        index + 1
                                                                  }`
                                                            )
                                                      }
                                                />
                                          ))
                                    ) : (
                                          <Text>No chapters available.</Text>
                                    )}
                              </Box>

                              <Box
                                    ml={4}
                                    w={{ base: "full", md: "400px" }}
                                    order={{ base: 1, md: 2 }}
                              >
                                    <CourseInfo />
                              </Box>
                        </Flex>
                  </Box>
            </Layout>
      );
};

export default Module;
