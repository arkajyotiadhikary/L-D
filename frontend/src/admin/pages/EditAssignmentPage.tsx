import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import AnswerInput from "../components/AnswerInput";
import QuestionEditor from "../components/QuestionEditor";
import QuestionTypeSelector from "../components/QuestionTypeSelector";
import CompletionPoints from "../components/CompletionPoints";
import Layout from "../layouts/Main";
import OptionInput from "../components/OptionInput";

const EditAssignmentPage: React.FC = () => {
      const [questionType, setQuestionType] = useState<"multiple" | "single">("single");
      return (
            <Layout>
                  <Box p={8} bg={"white"}>
                        <Box mb={6}>
                              <QuestionEditor />
                        </Box>
                        <Box mb={6}>
                              <QuestionTypeSelector
                                    questionType={questionType}
                                    setQuestionType={setQuestionType}
                              />
                        </Box>
                        <Box>
                              <OptionInput />
                        </Box>
                        <Box mb={6}>
                              <AnswerInput questionType={questionType} />
                        </Box>
                        <Box mb={6}>
                              <CompletionPoints />
                        </Box>
                        <Button colorScheme="purple" mt={6}>
                              Add Question
                        </Button>
                  </Box>
            </Layout>
      );
};

export default EditAssignmentPage;
