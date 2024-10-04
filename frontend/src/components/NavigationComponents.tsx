import { Button, Box } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavigationButtons = ({
      currentChapter,
      currentModule,
      totalChapters,
}: {
      currentChapter: number;
      currentModule: string;
      totalChapters: number;
}) => {
      const navigate = useNavigate();

      // Function to handle navigation
      const handlePrev = () => {
            if (currentChapter > 0) {
                  navigate(`/module/${currentModule}/content/${currentChapter - 1}`);
            }
      };

      const handleNext = () => {
            if (currentChapter < totalChapters)
                  navigate(`/module/${currentModule}/content/${currentChapter + 1}`);
      };

      return (
            <Box display="flex" justifyContent="space-between" mt={4}>
                  <Button
                        leftIcon={<FaArrowLeft />}
                        colorScheme="gray"
                        variant="outline"
                        size="sm"
                        onClick={handlePrev}
                        isDisabled={currentChapter <= 1} // Disable "Prev" if at first chapter
                  >
                        Prev
                  </Button>
                  <Button
                        rightIcon={<FaArrowRight />}
                        colorScheme="gray"
                        variant="outline"
                        size="sm"
                        onClick={handleNext}
                  >
                        Next
                  </Button>
            </Box>
      );
};

export default NavigationButtons;
