import { Box, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ModuleCard = ({
      title,
      description,
      completion,
      img,
      order,
}: {
      title: string;
      description: string;
      completion?: "completed" | "progress" | "incomplete";
      img?: string;
      order: number;
}) => {
      const navigate = useNavigate();
      return (
            <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  bg="gray.50"
                  display="flex"
                  flexDirection="column"
                  alignItems="start"
                  transition="all 0.2s ease-in-out"
                  onClick={
                        completion === "incomplete" ? undefined : () => navigate(`/module/${order}`)
                  }
                  opacity={completion === "incomplete" ? 0.5 : 1}
                  pointerEvents={completion === "incomplete" ? "none" : undefined}
                  _hover={{
                        bg: "gray.100",
                        boxShadow: "md",
                        transform: "scale(1.02)",
                        cursor: "pointer",
                  }}
            >
                  <Image
                        src={img}
                        alt="Module"
                        mb={4}
                        w="100%"
                        h="80"
                        objectFit="cover"
                        rounded="md"
                  />
                  <Box display="flex" p={5} flexDirection="column" alignItems="start">
                        <Text fontWeight="bold" fontSize="lg">
                              {title}
                        </Text>
                        <Text color="gray.600">{description}</Text>
                        <Text
                              mt={4}
                              fontWeight="semibold"
                              color={
                                    completion === "completed"
                                          ? "green.500"
                                          : completion === "incomplete"
                                          ? "red.500"
                                          : completion === "progress"
                                          ? "gray.500"
                                          : "yellow.500"
                              }
                        >
                              {completion === "completed"
                                    ? "Completed"
                                    : completion === "incomplete"
                                    ? "Incomplete"
                                    : completion === "progress"
                                    ? "Continue"
                                    : "In Progress"}
                        </Text>
                  </Box>
            </Box>
      );
};

export default ModuleCard;
