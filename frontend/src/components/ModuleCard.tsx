import { Box, Image, Text } from "@chakra-ui/react";

const ModuleCard = ({
      title,
      description,
      completion,
}: {
      title: string;
      description: string;
      completion: string;
}) => (
      <Box
            borderWidth="1px"
            borderRadius="lg"
            bg="gray.50"
            display="flex"
            flexDirection="column"
            alignItems="start"
            transition="all 0.2s ease-in-out"
            _hover={{
                  bg: "gray.100",
                  boxShadow: "md",
                  transform: "scale(1.02)",
                  cursor: "pointer",
            }}
      >
            <Image
                  src="https://via.placeholder.com/250"
                  alt="Module"
                  mb={4}
                  w="full"
                  objectFit="cover"
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

export default ModuleCard;
