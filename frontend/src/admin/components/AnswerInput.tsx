import React from "react";
import { Box, Input, Flex, IconButton, Heading } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

interface AnswerInputProps {
      questionType: "multiple" | "single";
}

const AnswerInput: React.FC<AnswerInputProps> = ({ questionType }) => {
      const [answers, setAnswers] = React.useState<string[]>([""]);
      const handleAddAnswer = () => {
            setAnswers((prev) => [...prev, ""]);
      };
      const handleRemoveAnswer = (index: number) => {
            setAnswers((prev) => prev.filter((_, i) => i !== index));
      };

      return (
            <Box>
                  <Heading size="sm" mb={2}>
                        Answers
                  </Heading>
                  {answers.map((answer, index) => (
                        <Flex key={index} mb={2}>
                              <Input
                                    placeholder={`Option ${index + 1}`}
                                    value={answer}
                                    onChange={(e) =>
                                          setAnswers((prev) =>
                                                prev.map((a, i) =>
                                                      i === index ? e.target.value : a
                                                )
                                          )
                                    }
                              />
                              {questionType === "multiple" && (
                                    <IconButton
                                          aria-label="Remove option"
                                          icon={<MinusIcon />}
                                          ml={2}
                                          onClick={() => handleRemoveAnswer(index)}
                                    />
                              )}
                        </Flex>
                  ))}
                  {questionType === "multiple" && (
                        <IconButton
                              aria-label="Add option"
                              icon={<AddIcon />}
                              onClick={handleAddAnswer}
                        />
                  )}
            </Box>
      );
};

export default AnswerInput;
