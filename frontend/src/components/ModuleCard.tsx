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
      completion?: string;
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
                  onClick={() => navigate(`/module/${order}`)}
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
                              color={completion === "100%" ? "green.500" : "gray.500"}
                        >
                              {completion} Completed
                        </Text>
                  </Box>
            </Box>
      );
};

export default ModuleCard;
