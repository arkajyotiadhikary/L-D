// TODO make different sidebar component

// Sidebar.tsx
import React from "react";
import {
      Drawer,
      DrawerBody,
      DrawerHeader,
      DrawerOverlay,
      DrawerContent,
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
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// 1. Define the SidebarItemProps interface
interface SidebarItemProps {
      icon: IconDefinition;
      label: string;
      onClick?: () => void;
      children?: React.ReactNode;
      defaultIsOpen?: boolean;
}

// 2. Define the SidebarProps interface
interface SidebarProps {
      isOpen: boolean;
      onClose: () => void;
}
// SidebarItem Component
const SidebarItem: React.FC<SidebarItemProps> = ({
      icon,
      label,
      onClick,
      children,
      defaultIsOpen = false,
}) => {
      const { isOpen, onToggle } = useDisclosure({ defaultIsOpen });

      return (
            <Box width="100%">
                  <Button
                        variant="ghost"
                        justifyContent="flex-start"
                        width="100%"
                        onClick={() => {
                              if (children) {
                                    onToggle();
                              } else if (onClick) {
                                    onClick();
                              }
                        }}
                        leftIcon={<FontAwesomeIcon icon={icon} />}
                        rightIcon={
                              children ? (
                                    <FontAwesomeIcon
                                          icon={isOpen ? faChevronDown : faChevronRight}
                                    />
                              ) : undefined
                        }
                        aria-haspopup={children ? "menu" : undefined}
                        aria-expanded={children ? isOpen : undefined}
                  >
                        {label}
                  </Button>
                  {children && (
                        <Collapse in={isOpen} animateOpacity>
                              <VStack align="start" pl={4} mt={2} spacing={2}>
                                    {children}
                              </VStack>
                        </Collapse>
                  )}
            </Box>
      );
};
// Sidebar Component
const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
      const navigate = useNavigate();

      return (
            <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
                  <DrawerOverlay />
                  <DrawerContent>
                        <DrawerHeader borderBottomWidth="1px" position="relative">
                              Logo
                              <IconButton
                                    icon={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
                                    variant="ghost"
                                    onClick={onClose}
                                    aria-label="Close menu"
                                    position="absolute"
                                    right={3}
                                    top={3}
                              />
                        </DrawerHeader>
                        <DrawerBody>
                              <VStack spacing={4} align="stretch" mt={4}>
                                    {/* Instructors SidebarItem (Open by Default) */}
                                    <SidebarItem
                                          icon={faBook}
                                          label="Instructors"
                                          defaultIsOpen={true}
                                    >
                                          <Button
                                                variant="ghost"
                                                justifyContent="flex-start"
                                                width="100%"
                                                leftIcon={<FontAwesomeIcon icon={faBook} />}
                                                onClick={() =>
                                                      navigate("/instructor/modules/manage")
                                                }
                                          >
                                                Manage Modules
                                          </Button>
                                          <Button
                                                variant="ghost"
                                                justifyContent="flex-start"
                                                width="100%"
                                                leftIcon={
                                                      <FontAwesomeIcon icon={faCircleQuestion} />
                                                }
                                                onClick={() => navigate("/manage-quizzes")}
                                          >
                                                Manage Assignments
                                          </Button>
                                          <Button
                                                variant="ghost"
                                                justifyContent="flex-start"
                                                width="100%"
                                                leftIcon={<FontAwesomeIcon icon={faFilePen} />}
                                                onClick={() => navigate("/edit-courses")}
                                          >
                                                Edit Module
                                          </Button>
                                          <Button
                                                variant="ghost"
                                                justifyContent="flex-start"
                                                width="100%"
                                                leftIcon={<FontAwesomeIcon icon={faPenSquare} />}
                                                onClick={() => navigate("/edit-quiz")}
                                          >
                                                Edit Assignment
                                          </Button>
                                    </SidebarItem>
                                    <SidebarItem
                                          icon={faCubes}
                                          label="Modules"
                                          onClick={() => navigate("/dashboard")}
                                    />
                                    <SidebarItem
                                          icon={faClipboard}
                                          label="Assignments"
                                          onClick={() => navigate("/assignments")}
                                    />
                                    <SidebarItem
                                          icon={faStar}
                                          label="Scores"
                                          onClick={() => navigate("/scores")}
                                    />
                                    <SidebarItem
                                          icon={faHistory}
                                          label="Learning History"
                                          onClick={() => navigate("/learning-history")}
                                    />
                              </VStack>
                        </DrawerBody>
                  </DrawerContent>
            </Drawer>
      );
};

export default Sidebar;
