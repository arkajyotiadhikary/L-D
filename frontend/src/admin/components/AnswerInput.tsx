import React from "react";
import { Box, Input, Flex, Heading, useColorModeValue, FormControl } from "@chakra-ui/react";

const AnswerInput: React.FC = () => {
      const [answers, setAnswers] = React.useState<string[]>([""]);

      // Utilize the same color mode values as in the styled component
      const bgColor = useColorModeValue("white", "gray.700");
      const borderColor = useColorModeValue("gray.200", "gray.600");

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
                        Answer
                  </Heading>
                  <Flex direction="column" gap={4}>
                        {answers.map((answer, index) => (
                              <FormControl key={index} id={`answer-${index + 1}`} isRequired>
                                    <Input
                                          placeholder={`Answer`}
                                          value={answer}
                                          onChange={(e) =>
                                                setAnswers((prev) =>
                                                      prev.map((a, i) =>
                                                            i === index ? e.target.value : a
                                                      )
                                                )
                                          }
                                          size="md"
                                    />
                              </FormControl>
                        ))}
                  </Flex>
            </Box>
      );
};

export default AnswerInput;
