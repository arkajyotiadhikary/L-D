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
                  <Box my={10} px={5} mx={275}>
                        {/* Breadcrumbs */}
                        <Breadcrumb separator=">" mt={6} p={8}>
                              <BreadcrumbItem>
                                    <BreadcrumbLink onClick={() => navigate("/dashboard")}>
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
                        >
                              <Box flex="1" p={8} w="full" order={{ base: 2, md: 1 }}>
                                    <HStack justify="space-between" mb={5}>
                                          <Text fontSize="2xl" fontWeight="bold">
                                                {currentModule?.title}
                                          </Text>
                                    </HStack>

                                    <Box
                                          bgColor={"white"}
                                          fontSize="larger"
                                          mb={5}
                                          p={6}
                                          color="gray.700"
                                          dangerouslySetInnerHTML={{
                                                __html: currentModule?.description || "",
                                          }}
                                    />
                                    {chapters?.length > 0 && (
                                          <VideoCard
                                                key={chapters[0]?._id}
                                                title={chapters[0]?.title}
                                                description={chapters[0]?.description}
                                                content={chapters[0]?.content}
                                                progress={(1 / chapters.length) * 100}
                                                completion="progress"
                                                onClick={() =>
                                                      navigate(
                                                            `/learnings/module/${id}/content/${1}`
                                                      )
                                                }
                                          />
                                    )}
                                    {chapters?.length > 1 && (
                                          <VideoCard
                                                key={chapters[1]?._id}
                                                title={chapters[1]?.title}
                                                description={chapters[1]?.description}
                                                content={chapters[1]?.content}
                                                progress={(2 / chapters.length) * 100}
                                                completion="progress"
                                                onClick={() =>
                                                      navigate(
                                                            `/learnings/module/${id}/content/${2}`
                                                      )
                                                }
                                          />
                                    )}
                                    {/* {chapters?.length > 0 ? (
                                          chapters.map((chapter, index) => (
                                                <VideoCard
                                                      key={chapter._id}
                                                      title={chapter.title}
                                                      description={chapter.description}
                                                      content={chapter.content}
                                                      progress={
                                                            ((index + 1) / chapters.length) * 100
                                                      }
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
                                    )} */}
                              </Box>

                              <Box
                                    mt="90px"
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
