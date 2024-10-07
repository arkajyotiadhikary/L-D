import React, { useState } from "react";
import {
      Box,
      Input,
      Flex,
      IconButton,
      Heading,
      Button,
      FormControl,
      FormLabel,
      VStack,
      HStack,
      Tooltip,
      useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";

interface Option {
      id: string;
      value: string;
}

const AnswerInput: React.FC = () => {
      const [options, setOptions] = useState<Option[]>([
            { id: uuidv4(), value: "" },
            { id: uuidv4(), value: "" },
            { id: uuidv4(), value: "" },
            { id: uuidv4(), value: "" },
      ]);

      const addOption = () => {
            setOptions([...options, { id: uuidv4(), value: "" }]);
      };

      const removeOption = (id: string) => {
            setOptions(options.filter((option) => option.id !== id));
      };

      const handleOptionChange = (id: string, newValue: string) => {
            setOptions(
                  options.map((option) =>
                        option.id === id ? { ...option, value: newValue } : option
                  )
            );
      };

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
            >
                  <Heading size="md" mb={6}>
                        Answer Options
                  </Heading>
                  <VStack spacing={4} align="stretch">
                        {options.map((option, index) => (
                              <Flex key={option.id} alignItems="center">
                                    <FormControl id={`option-${index + 1}`} isRequired>
                                          <FormLabel fontSize="sm">Option {index + 1}</FormLabel>
                                          <HStack>
                                                <Input
                                                      placeholder={`Enter option ${index + 1}`}
                                                      value={option.value}
                                                      onChange={(e) =>
                                                            handleOptionChange(
                                                                  option.id,
                                                                  e.target.value
                                                            )
                                                      }
                                                      size="md"
                                                />
                                                {options.length > 4 && (
                                                      <Tooltip
                                                            label="Remove option"
                                                            placement="top"
                                                      >
                                                            <IconButton
                                                                  aria-label="Remove option"
                                                                  icon={<DeleteIcon />}
                                                                  colorScheme="red"
                                                                  variant="ghost"
                                                                  onClick={() =>
                                                                        removeOption(option.id)
                                                                  }
                                                                  size="sm"
                                                            />
                                                      </Tooltip>
                                                )}
                                          </HStack>
                                    </FormControl>
                              </Flex>
                        ))}
                  </VStack>
                  <Button
                        leftIcon={<AddIcon />}
                        colorScheme="teal"
                        variant="outline"
                        onClick={addOption}
                        mt={6}
                        w="full"
                  >
                        Add Option
                  </Button>
            </Box>
      );
};

export default AnswerInput;
