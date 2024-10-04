import { Box, Select, Heading } from "@chakra-ui/react";

interface QuestionTypeSelectorProps {
      questionType: "multiple" | "single";
      setQuestionType: (questionType: "multiple" | "single") => void;
}
const QuestionTypeSelector: React.FC<QuestionTypeSelectorProps> = ({
      questionType,
      setQuestionType,
}) => {
      return (
            <Box>
                  <Heading size="sm" mb={2}>
                        Question Type
                  </Heading>
                  <Select
                        placeholder="Select question type"
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value as "multiple" | "single")}
                  >
                        <option value="multiple">Multiple Answer</option>
                        <option value="single">Single Answer</option>
                  </Select>
            </Box>
      );
};

export default QuestionTypeSelector;
