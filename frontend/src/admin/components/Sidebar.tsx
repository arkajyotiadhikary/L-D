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
      Badge,
      Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
      faAngleDoubleLeft,
      faMugHot,
      faChevronDown,
      faChevronRight,
      faClipboard,
      faCubes,
      faHistory,
      faStar,
      faClockRotateLeft,
      faThumbsUp,
      faCreditCard,
      faBell,
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
      notifications?: number;
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
      notifications = 0,
}) => {
      const { isOpen, onToggle } = useDisclosure({ defaultIsOpen });

      const handleClick = () => {
            if (children) {
                  onToggle();
            } else if (onClick) {
                  onClick();
            }
      };

      return (
            <Box width="100%">
                  <Button
                        variant="ghost"
                        justifyContent="flex-start"
                        width="100%"
                        onClick={handleClick}
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
                        position="relative"
                  >
                        <Flex flex="1" alignItems="center" justifyContent="space-between">
                              <Box>{label}</Box>
                              {notifications > 0 && (
                                    <Flex alignItems="center" ml={2}>
                                          <FontAwesomeIcon icon={faBell} size="sm" />
                                          <Badge
                                                colorScheme="red"
                                                borderRadius="full"
                                                ml={1}
                                                fontSize="0.7em"
                                                p={1}
                                          >
                                                {notifications}
                                          </Badge>
                                    </Flex>
                              )}
                        </Flex>
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
                                          icon={faMugHot}
                                          label="Clients"
                                          onClick={() => navigate("/admin/dashboard")}
                                    />
                                    <SidebarItem
                                          icon={faClockRotateLeft}
                                          label="Client History"
                                          onClick={() => navigate("/admin/client-history")}
                                    />
                                    <SidebarItem
                                          icon={faCubes}
                                          label="Modules"
                                          onClick={() => navigate("/modules")}
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
                                    <SidebarItem
                                          icon={faThumbsUp}
                                          label="Content Approval"
                                          onClick={() => navigate("/admin/content-approval")}
                                    />
                                    <SidebarItem
                                          icon={faCreditCard}
                                          label="Credit Approval"
                                          onClick={() => navigate("/admin/credit-approval")}
                                          notifications={2}
                                    />
                              </VStack>
                        </DrawerBody>
                  </DrawerContent>
            </Drawer>
      );
};

export default Sidebar;
