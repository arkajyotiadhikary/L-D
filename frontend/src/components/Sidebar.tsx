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
import { useNavigate, useLocation } from "react-router-dom";
import {
      faAngleDoubleLeft,
      faChevronDown,
      faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 1. Define the SidebarItemProps interface
interface SidebarItemProps {
      label: string;
      path: string;
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
      label,
      path,
      onClick,
      children,
      defaultIsOpen = false,
}) => {
      const { isOpen, onToggle } = useDisclosure({ defaultIsOpen });
      const location = useLocation(); // Get the current path
      const isActive =
            location.pathname === path ||
            location.pathname.includes(`${path}/`) ||
            location.pathname.includes(`${path}-`);

      return (
            <Box width="100%">
                  <Button
                        _hover={
                              isActive
                                    ? {
                                            bgGradient: "linear(to-r, blue.500, purple.500)",
                                            color: "white",
                                      }
                                    : undefined
                        }
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
                        rightIcon={
                              children ? (
                                    <FontAwesomeIcon
                                          icon={isOpen ? faChevronDown : faChevronRight}
                                    />
                              ) : undefined
                        }
                        aria-haspopup={children ? "menu" : undefined}
                        aria-expanded={children ? isOpen : undefined}
                        bgGradient={isActive ? "linear(to-r, blue.500, purple.500)" : undefined}
                        color={isActive ? "white" : "gray.700"} // Change text color if active
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
                                    <SidebarItem
                                          label="Home"
                                          path="/dashboard"
                                          onClick={() => navigate("/dashboard")}
                                    />
                                    <SidebarItem
                                          label="Learnings"
                                          path="/learnings"
                                          onClick={() => navigate("/learnings")}
                                    />
                                    <SidebarItem
                                          label="Explore"
                                          path="/explore"
                                          onClick={() => navigate("/explore")}
                                    />
                                    <SidebarItem
                                          label="History"
                                          path="/history"
                                          onClick={() => navigate("/history")}
                                    />
                              </VStack>
                        </DrawerBody>
                  </DrawerContent>
            </Drawer>
      );
};

export default Sidebar;
