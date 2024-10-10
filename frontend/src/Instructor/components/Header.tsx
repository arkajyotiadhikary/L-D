import {
      Flex,
      IconButton,
      Text,
      useDisclosure,
      HStack,
      Box,
      Menu,
      MenuButton,
      MenuList,
      MenuItem,
      Avatar,
} from "@chakra-ui/react";
import { FiX, FiMenu, FiChevronLeft, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
      const navigate = useNavigate();
      const location = useLocation();
      const { isOpen, onOpen, onClose } = useDisclosure();

      return (
            <Flex
                  as="header"
                  justify="space-between"
                  align="center"
                  p={4}
                  bg="white"
                  boxShadow="sm"
                  position="sticky"
                  top={0}
                  zIndex={10}
            >
                  <HStack spacing={4}>
                        {(location.pathname.includes("/content") ||
                              location.pathname.includes("/assignment")) && (
                              <IconButton
                                    icon={<FiChevronLeft />}
                                    variant="ghost"
                                    aria-label="Back"
                                    onClick={() => navigate("/module/1")}
                                    _hover={{ bg: "gray.100" }}
                              />
                        )}
                        <Text
                              fontSize={{ base: "xl", md: "2xl" }}
                              fontWeight="bold"
                              color="blue.600"
                        >
                              Management Training Dashboard
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
            </Flex>
      );
};

export default Header;
