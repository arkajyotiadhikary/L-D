import { Flex, Text, IconButton, Box } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface SectionProps {
      title: string;
      _id: string;
}

const Section: React.FC<SectionProps> = ({ title, _id }) => {
      const navigation = useNavigate();
      return (
            <Box bg="white" p={4} borderRadius="md" boxShadow="sm" mb={4} w="50%">
                  <Flex justify="space-between" align="center">
                        <Text fontSize="lg" fontWeight="bold">
                              {title}
                        </Text>
                        <IconButton
                              aria-label="Edit section"
                              icon={<FaEdit />}
                              size="sm"
                              variant="ghost"
                              colorScheme="blue"
                              ml={2}
                              onClick={() => navigation(`/admin/chapter/edit/${_id}`)}
                        />
                  </Flex>
            </Box>
      );
};

export default Section;
