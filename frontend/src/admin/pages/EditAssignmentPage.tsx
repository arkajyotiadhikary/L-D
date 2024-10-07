import React from "react";
import {
      Button,
      VStack,
      Heading,
      useColorModeValue,
      Container,
      Divider,
      Icon,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AnswerInput from "../components/AnswerInput";
import QuestionEditor from "../components/QuestionEditor";
import CompletionPoints from "../components/CompletionPoints";
import Layout from "../layouts/Main";
import OptionInput from "../components/OptionInput";

const EditAssignmentPage: React.FC = () => {
      const buttonColorScheme = useColorModeValue("purple", "teal");

      return (
            <Layout>
                  <Container maxW="container.xl" py={8}>
                        <VStack spacing={8} align="stretch">
                              <Heading size="lg">Edit Assignment</Heading>

                              <QuestionEditor />
                              <OptionInput />
                              <AnswerInput />
                              <CompletionPoints />

                              <Divider />

                              <Button
                                    leftIcon={<Icon as={AddIcon} />}
                                    colorScheme={buttonColorScheme}
                                    size="lg"
                                    alignSelf="flex-start"
                              >
                                    Add Question
                              </Button>
                        </VStack>
                  </Container>
            </Layout>
      );
};

export default EditAssignmentPage;
