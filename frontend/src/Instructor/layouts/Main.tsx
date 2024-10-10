import { useState } from "react";
import { Flex, Box, IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
      const [isOpen, setIsOpen] = useState(false);

      const onClose = () => setIsOpen(false);

      return (
            <Flex minH="100vh" bg={"white"} w={"full"}>
                  {/* Sidebar */}
                  <IconButton
                        icon={<FontAwesomeIcon icon={faAngleDoubleRight} />}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Sidebar"
                        variant="ghost"
                        left={"10px"}
                        top={5}
                  />

                  <Sidebar isOpen={isOpen} onClose={onClose} />

                  {/* Main Content */}
                  <Box w={"full"} flex="1" ml={{ base: 0, md: isOpen ? "60" : "0" }} bg="gray.100">
                        {/* Header */}
                        <Header />

                        {/* Page-specific content */}
                        <Box p={5}>{children}</Box>
                  </Box>
            </Flex>
      );
};

export default Layout;
