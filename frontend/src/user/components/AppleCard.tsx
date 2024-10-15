import { Box, Text, Button, Image, Card, CardBody, CardFooter, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

interface AppleCardProps {
      heading: string;
      desciption: string;
      image: string;
      moduleId: string;
      due: string;
}

const AppleCard: React.FC<AppleCardProps> = ({ heading, image, moduleId, due }) => {
      const navigate = useNavigate();
      return (
            <Card
                  shadow="sm"
                  position="relative"
                  borderRadius="2xl"
                  overflow="hidden"
                  transition="all 0.2s ease-in-out"
                  _hover={{ transform: "scale(1.02)", cursor: "pointer", shadow: "lg" }}
            >
                  {/* Image as background */}
                  <Image src={image} alt="Person" objectFit="cover" w="full" h="500px" />

                  {/* Overlay content */}
                  <Box
                        position="absolute"
                        top="0"
                        left="0"
                        w="full"
                        h="full"
                        bg="blackAlpha.500"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                  >
                        <CardBody>
                              {/* Small text at the top */}

                              {/* Big Title */}
                              <Heading color="white" as="h2" size="lg" mt={1} fontWeight={"light"}>
                                    {heading}
                              </Heading>
                        </CardBody>

                        <Box className="bg-[#fffefe]" p={4}>
                              <CardFooter
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    fontSize="sm"
                                    opacity={0.6}
                                    bg="fffefe"
                                    color="gray.600"
                                    borderColor="gray.200"
                              >
                                    {/* Description */}
                                    {/* <Box mr={2} dangerouslySetInnerHTML={{ __html: desciption }} /> */}
                                    <Text>{due}</Text>

                                    {/* Play Button */}
                                    <Box bg="#E8E8ED" borderRadius="full" p={2} shadow={"lg"}>
                                          <Button
                                                onClick={() =>
                                                      navigate(`/learnings/module/${moduleId}`)
                                                }
                                                variant="unstyled"
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                                color="white"
                                          >
                                                <FontAwesomeIcon color="#1d1d1f" icon={faPlay} />
                                          </Button>
                                    </Box>
                              </CardFooter>
                        </Box>
                  </Box>
            </Card>
      );
};

export default AppleCard;
