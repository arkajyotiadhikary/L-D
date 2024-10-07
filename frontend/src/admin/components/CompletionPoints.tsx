import React from "react";
import { Box, Input, Heading, FormControl, FormLabel, useColorModeValue } from "@chakra-ui/react";

const CompletionPoints: React.FC = () => {
      const [points, setPoints] = React.useState<string>("");

      const bgColor = useColorModeValue("white", "gray.700");
      const borderColor = useColorModeValue("gray.200", "gray.600");

      const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setPoints(value);
      };

      return (
            <Box
                  bg={bgColor}
                  borderRadius="md"
                  p={6}
                  boxShadow="sm"
                  border="1px"
                  borderColor={borderColor}
                  w="100%"
            >
                  <Heading size="md" mb={6}>
                        Completion Points
                  </Heading>
                  <FormControl id="completion-points" isRequired>
                        <FormLabel fontSize="sm">Enter Completion Points</FormLabel>
                        <Input
                              type="number"
                              placeholder="Enter completion points"
                              value={points}
                              onChange={handlePointsChange}
                              size="md"
                              min={0} // Ensures only positive numbers are entered
                              // step={1} // Uncomment if you want to allow only integers
                        />
                  </FormControl>
            </Box>
      );
};

export default CompletionPoints;
