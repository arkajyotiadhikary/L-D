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
      Collapse,
      useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
      faAngleDoubleLeft,
      faBook,
      faChevronDown,
      faChevronRight,
      faCircleQuestion,
      faClipboard,
      faCubes,
      faFilePen,
      faHistory,
      faPenSquare,
      faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
      const navigate = useNavigate();
      const { isOpen: isInstructorOpen, onToggle: onInstructorToggle } = useDisclosure();

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
                                    {/* Instructor Dropdown */}
                                    <Button
                                          variant="link"
                                          onClick={onInstructorToggle}
                                          rightIcon={
                                                <FontAwesomeIcon
                                                      icon={
                                                            isInstructorOpen
                                                                  ? faChevronDown
                                                                  : faChevronRight
                                                      }
                                                />
                                          }
                                    >
                                          Instructors
                                    </Button>
                                    <Collapse in={isInstructorOpen}>
                                          <VStack spacing={4} align="start">
                                                <Button
                                                      variant="link"
                                                      onClick={() =>
                                                            navigate("/admin/modules/manage")
                                                      }
                                                >
                                                      <FontAwesomeIcon
                                                            style={{ marginRight: "5px" }}
                                                            icon={faBook}
                                                      />
                                                      Manage Modules
                                                </Button>
                                                <Button
                                                      variant="link"
                                                      onClick={() => navigate("/manage-quizzes")}
                                                >
                                                      <FontAwesomeIcon
                                                            style={{ marginRight: "5px" }}
                                                            icon={faCircleQuestion}
                                                      />
                                                      Manage Assignments
                                                </Button>
                                                <Button
                                                      variant="link"
                                                      onClick={() => navigate("/edit-courses")}
                                                >
                                                      <FontAwesomeIcon
                                                            style={{ marginRight: "5px" }}
                                                            icon={faFilePen}
                                                      />
                                                      Edit Module
                                                </Button>
                                                <Button
                                                      variant="link"
                                                      onClick={() => navigate("/edit-quiz")}
                                                >
                                                      <FontAwesomeIcon
                                                            style={{ marginRight: "5px" }}
                                                            icon={faPenSquare}
                                                      />
                                                      Edit Assignment
                                                </Button>
                                          </VStack>
                                    </Collapse>

                                    {/* Other Sidebar Items */}
                                    <VStack spacing={4} align="start">
                                          <Button
                                                variant="link"
                                                onClick={() => navigate("/modules")}
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
                        </DrawerBody>
                  </DrawerContent>
            </Drawer>
      );
};

export default Sidebar;
