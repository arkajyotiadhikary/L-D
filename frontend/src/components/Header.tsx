import { Flex, IconButton, Text, Image, useDisclosure } from "@chakra-ui/react";
import { FiX, FiMenu } from "react-icons/fi";

const Header = () => {
      const { isOpen, onOpen, onClose } = useDisclosure();

      return (
            <Flex justify="space-between" align="center" p={5} bg="white">
                  <Text fontSize="2xl" fontWeight="bold">
                        Compliance Training
                  </Text>
                  <IconButton
                        icon={isOpen ? <FiX /> : <FiMenu />}
                        aria-label="Toggle Menu"
                        display={{ md: "none" }}
                        onClick={isOpen ? onClose : onOpen}
                  />
                  <Image src="https://via.placeholder.com/40" alt="User" borderRadius="full" />
            </Flex>
      );
};

export default Header;
