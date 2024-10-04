import {
      Drawer,
      DrawerBody,
      DrawerContent,
      DrawerHeader,
      DrawerOverlay,
      VStack,
      Button,
      IconButton,
      Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
      faAngleDoubleLeft,
      faClipboard,
      faCubes,
      faHistory,
      faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
      const navigate = useNavigate();
      return (
            <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="xs">
                  <DrawerOverlay />
                  <DrawerContent>
                        <Box position="absolute" top="4" right="4">
                              <IconButton
                                    icon={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
                                    variant="ghost"
                                    onClick={onClose}
                                    aria-label="Close menu"
                              />
                        </Box>
                        <DrawerHeader>Logo</DrawerHeader>
                        <hr />
                        <DrawerBody>
                              <VStack spacing={4} align="start">
                                    <VStack spacing={4} align="start" mt={10}>
                                          <VStack spacing={4} align="start">
                                                <Button
                                                      variant="link"
                                                      onClick={() => navigate("/dashboard")}
                                                >
                                                      <FontAwesomeIcon
                                                            style={{ marginRight: "5px" }}
                                                            icon={faCubes}
                                                      />
                                                      Modules
                                                </Button>
                                                <Button
                                                      variant="link"
                                                      onClick={() => navigate("/assignments")}
                                                >
                                                      <FontAwesomeIcon
                                                            style={{ marginRight: "5px" }}
                                                            icon={faClipboard}
                                                      />
                                                      Assignments
                                                </Button>
                                                <Button
                                                      variant="link"
                                                      onClick={() => navigate("/scores")}
                                                >
                                                      <FontAwesomeIcon
                                                            style={{ marginRight: "5px" }}
                                                            icon={faStar}
                                                      />
                                                      Scores
                                                </Button>
                                                <Button
                                                      variant="link"
                                                      onClick={() => navigate("/learning-history")}
                                                >
                                                      <FontAwesomeIcon
                                                            style={{ marginRight: "5px" }}
                                                            icon={faHistory}
                                                      />
                                                      Learning History
                                                </Button>
                                          </VStack>
                                    </VStack>
                              </VStack>
                        </DrawerBody>
                  </DrawerContent>
            </Drawer>
      );
};

export default Sidebar;
