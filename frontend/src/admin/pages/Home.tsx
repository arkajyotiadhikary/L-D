import { useState } from "react";
import { Box, Flex, Text, Link, Input, Button, FormControl, Image, VStack } from "@chakra-ui/react";
import img from "../../assets/images/Admin Home.jpg";
import { useNavigate } from "react-router-dom";
import { signin } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import useUserStore from "../../store";
const LoginPage = () => {
      const navigate = useNavigate();
      const { login } = useAuth();

      const [credentials, setCredentials] = useState({
            email: "",
            password: "",
      });

      const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
            event.preventDefault();
            try {
                  const { token, user } = await signin(credentials);
                  console.log(token, user);
                  login(token, user);
                  useUserStore.setState({ user });
                  navigate("/admin/dashboard");
            } catch (error) {
                  console.log(error);
            }
      };

      return (
            <Flex
                  justify="space-around"
                  align="center"
                  minH="100vh"
                  p={5}
                  gap={10}
                  direction={{ base: "column", md: "row" }}
            >
                  <Box textAlign="center" maxW="800px" p={10}>
                        <Text fontSize="4xl" mb={8}>
                              Please
                              <Link m={2} color="blue.500" href="#">
                                    login
                              </Link>
                              to complete your Compliance Training!
                        </Text>
                        <Box
                              p={10}
                              border="1px solid"
                              borderColor="#BCBCBC"
                              bg="#F8F5FA"
                              borderRadius="3xl"
                              textAlign="center"
                        >
                              <Text mb={8}>Start with Login</Text>
                              <VStack spacing={8}>
                                    <FormControl id="email">
                                          <Input
                                                type="email"
                                                placeholder="name@yourcompany.com"
                                                bg="#F2EFF3"
                                                borderColor="#BCBCBC"
                                                size="lg"
                                                padding={8}
                                                onChange={(e) =>
                                                      setCredentials({
                                                            ...credentials,
                                                            email: e.target.value,
                                                      })
                                                }
                                          />
                                    </FormControl>
                                    <FormControl id="password">
                                          <Input
                                                type="password"
                                                placeholder="Password"
                                                bg="#F2EFF3"
                                                borderColor="#BCBCBC"
                                                size="lg"
                                                padding={8}
                                                onChange={(e) =>
                                                      setCredentials({
                                                            ...credentials,
                                                            password: e.target.value,
                                                      })
                                                }
                                          />
                                    </FormControl>
                                    <Button
                                          onClick={handleSubmit}
                                          colorScheme="purple"
                                          width="full"
                                          size="lg"
                                    >
                                          Get Started
                                    </Button>
                                    <Text fontSize="md" color="gray.500">
                                          By continuing, you agree to our
                                          <Link color="blue.500" href="#">
                                                Customer Terms
                                          </Link>
                                          and
                                          <Link color="blue.500" href="#">
                                                Privacy Policy.
                                          </Link>
                                    </Text>
                              </VStack>
                        </Box>
                  </Box>
                  {/* Right Side - Image Section */}
                  <Box
                        display={{ base: "none", md: "block" }}
                        p={5}
                        textAlign="center"
                        position="relative"
                        maxWidth="45vw"
                  >
                        <Image
                              src={img} // Replace with actual image URL or import
                              alt="Welcome"
                              borderRadius="3xl"
                              boxShadow="lg"
                              mx="auto"
                              maxWidth="100%"
                              height="60vh"
                              width="60vw"
                              objectFit="cover"
                        />
                        <Text
                              position="absolute"
                              bottom={10}
                              left="25%"
                              transform="translateX(-50%)"
                              color="white"
                              fontSize="2xl"
                              fontWeight="bold"
                              zIndex={1}
                        >
                              Welcome, Nirmiti!
                        </Text>
                  </Box>
            </Flex>
      );
};

export default LoginPage;
