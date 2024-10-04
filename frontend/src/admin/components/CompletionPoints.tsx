import { Box, Input, Heading } from "@chakra-ui/react";

const CompletionPoints: React.FC = () => {
      return (
            <Box>
                  <Heading size="sm" mb={2}>
                        Completion Points
                  </Heading>
                  <Input placeholder="Enter completion points" />
            </Box>
      );
};

export default CompletionPoints;
