// pages/quiz.tsx
import {
      Box,
      Button,
      Container,
      Heading,
      Image,
      Modal,
      ModalBody,
      ModalCloseButton,
      ModalContent,
      ModalFooter,
      ModalHeader,
      ModalOverlay,
      Progress,
      Radio,
      RadioGroup,
      Stack,
      Text,
      useDisclosure,
      Icon,
      HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdClose, MdCheckCircle } from "react-icons/md"; // Icons for success or failure
import Layout from "../layouts/Main";

import { useNavigate } from "react-router-dom";

const QuizPage: React.FC = () => {
      const [value, setValue] = useState<string>("1");
      const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // To track answer correctness

      const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();

      const navigate = useNavigate();

      const handleSubmit = () => {
            // Logic to check the answer
            if (value === "2") {
                  // Correct answer
                  setIsCorrect(true);
            } else {
                  // Wrong answer
                  setIsCorrect(false);
            }
            openModal();
      };

      return (
            <Layout>
                  <Container bg="white" maxW="container" maxH={"100vh"} py={8} borderRadius={"lg"}>
                        <Box display="flex" alignItems="flex-start" gap={8}>
                              {/* Left Side: Text and Quiz */}
                              <Box flex="1">
                                    <Text fontSize="sm" color="gray.500">
                                          Module 1 &gt; Quiz
                                    </Text>
                                    <Heading as="h2" size="lg" mt={4} mb={8}>
                                          The New Team Member
                                    </Heading>
                                    <Text mb={6}>
                                          Hamid is new to Imani’s team and their manager keeps
                                          making jokes about Hamid’s nationality. Imani is
                                          uncomfortable, but she's not sure if the manager's conduct
                                          is harassment because Hamid doesn’t seem upset.
                                    </Text>
                                    <Text fontWeight="bold" mb={4}>
                                          What should Imani do?
                                    </Text>
                                    <Text mb={4}>Select the correct option.</Text>
                                    <RadioGroup onChange={setValue} value={value}>
                                          <Stack spacing={4}>
                                                <HStack bg="gray.100" borderRadius="md">
                                                      <Radio
                                                            value="1"
                                                            p={4}
                                                            bg="gray.300"
                                                            _checked={{
                                                                  bg: "gray.700",
                                                                  color: "white",
                                                                  borderColor: "gray.700",
                                                            }}
                                                      >
                                                            There is no need for Imani to get
                                                            involved, because Maeve hasn’t said
                                                            anything hurtful directly to Tejas.
                                                      </Radio>
                                                </HStack>

                                                <HStack bg="gray.100" borderRadius="md">
                                                      <Radio
                                                            value="2"
                                                            p={4}
                                                            bg="gray.300"
                                                            _checked={{
                                                                  bg: "gray.700",
                                                                  color: "white",
                                                                  borderColor: "gray.700",
                                                            }}
                                                      >
                                                            Maeve is entitled to her opinions to
                                                            Tejas, and there’s nothing Imani can do
                                                            to control her behavior.
                                                      </Radio>
                                                </HStack>

                                                <HStack bg="gray.100" borderRadius="md">
                                                      <Radio
                                                            value="3"
                                                            p={4}
                                                            bg="gray.300"
                                                            _checked={{
                                                                  bg: "gray.700",
                                                                  color: "white",
                                                                  borderColor: "gray.700",
                                                            }}
                                                      >
                                                            Imani should report Maeve’s behavior
                                                            internally straight away because it
                                                            could be harassment, even if Tejas is
                                                            unaware of it.
                                                      </Radio>
                                                </HStack>
                                          </Stack>
                                    </RadioGroup>

                                    <Button mt={8} colorScheme="purple" onClick={handleSubmit}>
                                          Submit
                                    </Button>

                                    <Box my={10} w="full" display="flex" justifyContent="center">
                                          <Progress
                                                colorScheme="purple"
                                                w="xs"
                                                size="md"
                                                value={50}
                                                borderRadius={"full"}
                                          />
                                    </Box>
                              </Box>

                              {/* Right Side: Image */}
                              <Box flex={1} h={"full"} display={{ base: "none", md: "block" }}>
                                    <Image
                                          h={"full"}
                                          w={"full"}
                                          objectFit="cover"
                                          borderRadius="md"
                                          src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
                                          alt="The New Team Member"
                                    />
                              </Box>
                        </Box>
                        // TODO have to move this in a differnet component
                        {/* Modal for Feedback */}
                        <Modal isOpen={isModalOpen} onClose={closeModal} isCentered>
                              <ModalOverlay />
                              <ModalContent>
                                    <ModalHeader>
                                          {isCorrect ? (
                                                <Icon
                                                      as={MdCheckCircle}
                                                      color="green.400"
                                                      w={8}
                                                      h={8}
                                                />
                                          ) : (
                                                <Icon as={MdClose} color="red.400" w={8} h={8} />
                                          )}
                                          <Text ml={2} display="inline-block">
                                                {isCorrect ? "Correct Answer!" : "Wrong Answer!"}
                                          </Text>
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                          <Text>
                                                {isCorrect
                                                      ? "Great job! Imani should report Maeve’s behavior internally straight away."
                                                      : "Maeve is entitled to her opinions to Tejas, but there’s nothing Imani can do to control her behavior."}
                                          </Text>
                                    </ModalBody>
                                    <ModalFooter>
                                          {isCorrect ? (
                                                <Button
                                                      colorScheme="green"
                                                      onClick={() =>
                                                            navigate("/dashboard", {
                                                                  replace: true,
                                                            })
                                                      }
                                                >
                                                      Next
                                                </Button>
                                          ) : (
                                                <Button colorScheme="red" onClick={closeModal}>
                                                      Retry
                                                </Button>
                                          )}
                                    </ModalFooter>
                              </ModalContent>
                        </Modal>
                  </Container>
            </Layout>
      );
};

export default QuizPage;
