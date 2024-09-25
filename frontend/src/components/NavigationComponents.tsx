import { Button, Box } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const NavigationButtons = () => {
      return (
            <Box>
                  <Button leftIcon={<FaArrowLeft />} colorScheme="gray" variant="outline" size="sm">
                        Prev
                  </Button>
                  <Button
                        rightIcon={<FaArrowRight />}
                        colorScheme="gray"
                        variant="outline"
                        size="sm"
                  >
                        Next
                  </Button>
            </Box>
      );
};

export default NavigationButtons;
