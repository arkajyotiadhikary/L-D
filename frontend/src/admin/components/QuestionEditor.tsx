import { Box, Textarea, Heading, Text } from "@chakra-ui/react";

const QuestionEditor: React.FC = () => {
      return (
            <Box>
                  <Heading size="sm" mb={2}>
                        Question
                  </Heading>
                  <Textarea placeholder="Write your question here.">
                        Hello World! Some initial bold text.
                  </Textarea>
                  <Text fontSize="sm" mt={2}>
                        Shortly describe this course.
                  </Text>
            </Box>
      );
};

export default QuestionEditor;
