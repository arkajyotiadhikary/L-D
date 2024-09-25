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
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
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
                                          <Button
                                                variant="link"
                                                onClick={() => navigate("/dashboard")}
                                          >
                                                Modules
                                          </Button>
                                          <Button variant="link">Assignments</Button>
                                          <Button variant="link">Scores</Button>
                                          <Button variant="link">Learning History</Button>
                                    </VStack>
                              </VStack>
                        </DrawerBody>
                  </DrawerContent>
            </Drawer>
      );
};

export default Sidebar;
