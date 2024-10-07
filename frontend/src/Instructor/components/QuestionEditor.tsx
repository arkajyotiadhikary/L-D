import React, { useState } from "react";
import {
      Box,
      Heading,
      Text,
      useColorModeValue,
      FormControl,
      FormLabel,
      VStack,
      Tooltip,
      Icon,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuestionEditor: React.FC = () => {
      const [question, setQuestion] = useState<string>("Hello World! Some initial bold text.");

      const bgColor = useColorModeValue("white", "gray.700");
      const borderColor = useColorModeValue("gray.200", "gray.600");
      const editorBgColor = useColorModeValue("gray.50", "gray.600");

      const handleQuestionChange = (content: string) => {
            setQuestion(content);
      };

      const modules = {
            toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                  ["clean"],
            ],
      };

      const formats = [
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "list",
            "bullet",
            "link",
            "image",
      ];

      return (
            <Box
                  bg={bgColor}
                  borderRadius="lg"
                  p={6}
                  boxShadow="sm"
                  border="1px"
                  borderColor={borderColor}
                  w="100%"
            >
                  <VStack align="stretch" spacing={4}>
                        <Heading size="md" fontWeight="bold">
                              Question Editor
                        </Heading>
                        <FormControl id="question" isRequired>
                              <FormLabel fontSize="sm" fontWeight="medium">
                                    Question Content
                              </FormLabel>
                              <Box
                                    borderRadius="md"
                                    overflow="hidden"
                                    border="1px"
                                    borderColor={borderColor}
                              >
                                    <ReactQuill
                                          value={question}
                                          onChange={handleQuestionChange}
                                          modules={modules}
                                          formats={formats}
                                          placeholder="Write your question here."
                                          theme="snow"
                                          style={{
                                                height: "200px",
                                                backgroundColor: editorBgColor,
                                          }}
                                    />
                              </Box>
                        </FormControl>
                        <Box>
                              <Tooltip
                                    label="Provide a clear and concise description of the question"
                                    placement="top"
                              >
                                    <Text
                                          fontSize="sm"
                                          color="gray.500"
                                          display="flex"
                                          alignItems="center"
                                    >
                                          <Icon as={InfoIcon} mr={1} /> Shortly describe this
                                          question.
                                    </Text>
                              </Tooltip>
                        </Box>
                  </VStack>
            </Box>
      );
};

export default QuestionEditor;
