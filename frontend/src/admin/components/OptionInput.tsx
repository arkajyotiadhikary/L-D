import { Box, Input, Flex, IconButton, Heading } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const AnswerInput: React.FC = () => {
      return (
            <Box>
                  <Heading size="sm" mb={2}>
                        Options
                  </Heading>
                  <Flex mb={2}>
                        <Input placeholder="Option 1" />
                        <IconButton aria-label="Add option" icon={<AddIcon />} ml={2} />
                  </Flex>
                  <Flex mb={2}>
                        <Input placeholder="Option 2" />
                        <IconButton aria-label="Add option" icon={<AddIcon />} ml={2} />
                  </Flex>
            </Box>
      );
};

export default AnswerInput;
