import {
      Box,
      Image,
      Text,
      Flex,
      Button,
      CircularProgress,
      CircularProgressLabel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ModuleCard = ({
      _id,
      title,
      dueDate,
      chapters,
      timeRemaining,
      completionPercentage,
      completion,
      img,
}: {
      _id: string;
      title: string;
      dueDate: string;
      chapters: number;
      timeRemaining: string;
      completionPercentage: number;
      completion?: "completed" | "progress" | "not-started";
      img?: string;
}) => {
      const navigate = useNavigate();

      const handleClick = () => {
            if (completion !== "completed") {
                  navigate(`/learnings/module/${_id}`);
            }
      };

      return (
            <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  bg="white"
                  boxShadow="lg"
                  overflow="hidden"
                  transition="all 0.2s ease-in-out"
                  _hover={{
                        boxShadow: "xl",
                        transform: "scale(1.02)",
                  }}
            >
                  {/* Image */}
                  <Image
                        src={img || "/api/placeholder/400/150"}
                        alt="Module"
                        w="100%"
                        h="200px"
                        objectFit="cover"
                        borderTopRadius="lg"
                  />

                  {/* Content */}
                  <Box p={4}>
                        <Text fontSize="lg" mb={2}>
                              {title}
                        </Text>

                        {/* Progress and Start Button */}
                        <Flex justifyContent="space-between" alignItems="center" mb={3}>
                              <CircularProgress
                                    value={completionPercentage}
                                    color="rgba(137, 31, 236, 0.7)" // Primary color for the progress bar
                                    size="50px"
                              >
                                    <CircularProgressLabel>
                                          {completionPercentage}%
                                    </CircularProgressLabel>
                              </CircularProgress>
                              <Button
                                    bgGradient="linear(to-r, blue.500, purple.500)"
                                    color="white"
                                    size="sm"
                                    onClick={handleClick}
                                    _hover={{
                                          bgGradient:
                                                "linear(to-b, rgba(137, 31, 236, 0.8) 0%, rgba(46, 6, 110, 0.8) 60%)", // Darker hover gradient
                                    }}
                              >
                                    {completion === "not-started"
                                          ? "Start"
                                          : completion === "completed"
                                          ? "Revisit"
                                          : "Resume"}
                              </Button>
                        </Flex>

                        {/* Additional Info */}
                        <Flex
                              justifyContent="space-between"
                              alignItems="center"
                              fontSize="sm"
                              color="gray.500"
                        >
                              <Text>{chapters} Lessons</Text>
                              <Text>Due: {dueDate}</Text>
                        </Flex>

                        <Text fontSize="sm" color="red.500" mt={2}>
                              {timeRemaining} left
                        </Text>
                  </Box>
            </Box>
      );
};

export default ModuleCard;
