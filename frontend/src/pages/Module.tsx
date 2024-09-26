import { Box, HStack, Button, Text, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CourseInfo from "../components/CourseInfo";
import VideoCard from "../components/VideoCard";
import Layout from "../layouts/Main";

const randomChapters = [
      {
            title: "Introduction",
            description:
                  "Sexual harassment is any unwelcome behavior of a sexual nature that creates an intimidating, hostile, or offensive environment. It can involve verbal, non-verbal, or physical actions, ranging from inappropriate comments and gestures to unwanted touching or advances. Sexual harassment is typically defined by its impact on the victim, rather than the intent of the perpetrator. It violates personal boundaries and is considered unlawful in most professional and educational settings, as it undermines an individual's dignity, safety, and right to equal treatment.",
            imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
            videoUrl: "https://www.youtube.com/watch?v=abc123XYZ",
            contentType: "video",
      },
      {
            title: "Chapter 2: Into the Unknown",
            description:
                  "Vivamus commodo odio vitae elit scelerisque, vel tincidunt nisi hendrerit.",
            imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            contentType: "video",
      },
      {
            title: "Chapter 3: The Discovery",
            description:
                  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
            imageUrl: "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
            videoUrl: "https://www.youtube.com/watch?v=Vbks4abvLEw",
            contentType: "image",
      },
      {
            title: "Chapter 4: A New Journey",
            description:
                  "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
            imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
            contentType: "text",
      },
      {
            title: "Chapter 5: The Final Frontier",
            description:
                  "Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat.",
            imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
            videoUrl: "https://www.youtube.com/watch?v=5qap5aO4i9A",
            contentType: "audio",
      },
];

console.log(randomChapters);

const Module = () => {
      const navigate = useNavigate();

      return (
            <Layout>
                  <Box p={5}>
                        <Text fontSize="2xl" fontWeight="bold">
                              Module 1
                        </Text>
                  </Box>

                  <Flex>
                        <Box flex="1" p={8} bg="gray.50">
                              <HStack justify="space-between" mb={5}>
                                    <Text fontSize="2xl" fontWeight="bold">
                                          Anti Harassment & Discrimination
                                    </Text>
                              </HStack>

                              <Text mb={4}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                    nulla pariatur.Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                              </Text>

                              {/* Videos List */}
                              {randomChapters.map((chapter, index) => (
                                    <VideoCard
                                          key={index}
                                          title={chapter.title}
                                          progress={index + 1}
                                          completed={index === 2}
                                          onClick={() => navigate(`/module/1/content/${index + 1}`)}
                                    />
                              ))}
                              <Flex>
                                    <Button mt={4} colorScheme="teal" size="sm" w="20%" mx="auto">
                                          Take an Assignment
                                    </Button>
                              </Flex>
                        </Box>

                        {/* Course Info Section */}
                        <Box w="300px" bg="gray.50" ml={4}>
                              <CourseInfo />
                        </Box>
                  </Flex>
            </Layout>
      );
};

export default Module;
