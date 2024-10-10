import {
      Flex,
      IconButton,
      Text,
      useDisclosure,
      HStack,
      Avatar,
      Box,
      Menu,
      MenuButton,
      MenuItem,
      MenuList,
} from "@chakra-ui/react";
import React from "react";
import { FiX, FiMenu, FiChevronLeft, FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
      moduleId: string;
}

const Header: React.FC<HeaderProps> = ({ moduleId }) => {
      const navigate = useNavigate();
      const location = useLocation();
      const { isOpen, onOpen, onClose } = useDisclosure();

      return (
            <Flex justify="space-between" align="center" p={5} bg="white">
                  <HStack>
                        {(location.pathname.includes("/content") ||
                              location.pathname.includes("/assignment")) && (
                              <IconButton
                                    icon={<FiChevronLeft size={32} />}
                                    bg={"none"}
                                    aria-label="Back"
                                    onClick={() => navigate(`/learnings/module/${moduleId}`)}
                              />
                        )}
                        <Text fontSize="2xl" fontWeight="bold">
                              Compliance Training
                        </Text>
                  </HStack>

                  <HStack spacing={4}>
                        <IconButton
                              icon={isOpen ? <FiX /> : <FiMenu />}
                              aria-label="Toggle Menu"
                              display={{ base: "flex", md: "none" }}
                              onClick={isOpen ? onClose : onOpen}
                              variant="ghost"
                        />

                        <Menu>
                              <MenuButton
                                    as={Box}
                                    rounded="full"
                                    cursor="pointer"
                                    _hover={{ boxShadow: "md" }}
                              >
                                    <Avatar
                                          size="sm"
                                          src="https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.jpg?s=1024x1024&w=is&k=20&c=8mgK2Kq73o8DIjazvLmEGkhx2p_7P5r3mvpbIM6q5cA="
                                          name="User"
                                    />
                              </MenuButton>
                              <MenuList>
                                    <MenuItem icon={<FiUser />}>Profile</MenuItem>
                                    <MenuItem icon={<FiSettings />}>Settings</MenuItem>
                                    <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
                              </MenuList>
                        </Menu>
                  </HStack>
                  {/* <IconButton
                        icon={isOpen ? <FiX /> : <FiMenu />}
                        aria-label="Toggle Menu"
                        display={{ md: "none" }}
                        onClick={isOpen ? onClose : onOpen}
                  />
                  <Image
                        src="https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.jpg?s=1024x1024&w=is&k=20&c=8mgK2Kq73o8DIjazvLmEGkhx2p_7P5r3mvpbIM6q5cA="
                        alt="User"
                        borderRadius="full"
                        boxSize="40px"
                        objectFit={"cover"}
                  /> */}
            </Flex>
      );
};

export default Header;
