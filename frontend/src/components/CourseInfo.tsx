import { Box, Divider, VStack, Text } from "@chakra-ui/react";

const CourseInfo = () => (
      <Box p={5} borderWidth="1px" borderRadius="md" bg="white">
            <Text fontWeight="bold" mb={3}>
                  View Course Again
            </Text>
            <Divider mb={3} />
            <VStack spacing={2} align="start">
                  <Text>
                        Status:
                        <Text as="span" color="green.500">
                              Completed
                        </Text>
                  </Text>
                  <Text>Duration: 1h 7m</Text>
                  <Text>Delivery Mode: Self-Directed</Text>
                  <Text>Lessons: 9</Text>
            </VStack>
            <Box mt={5}>
                  <Text fontWeight="bold">Assignment Score:</Text>
                  <Text fontSize="2xl">0.0/70</Text>
            </Box>
      </Box>
);

export default CourseInfo;
