import { Flex, IconButton, Text, Image, useDisclosure, HStack } from "@chakra-ui/react";
import { FiX, FiMenu, FiChevronLeft } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
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
                                    onClick={() => navigate("/module/1")}
                              />
                        )}
                        <Text fontSize="2xl" fontWeight="bold">
                              Compliance Training
                        </Text>
                  </HStack>
                  <IconButton
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
                  />
            </Flex>
      );
};

export default Header;
