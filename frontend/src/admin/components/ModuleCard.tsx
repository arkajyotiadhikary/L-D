import { Box, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ModuleCard = ({
      _id,
      title,
      description,
      img,
}: {
      _id: string;
      title: string;
      description: string;
      img?: string;
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
                  onClick={() => navigate(`/admin/module/edit/${_id}`)}
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
                        <Box dangerouslySetInnerHTML={{ __html: description }} />
                  </Box>
            </Box>
      );
};

export default ModuleCard;
