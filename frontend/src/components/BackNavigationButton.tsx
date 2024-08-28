import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@chakra-ui/react";

interface BackNavigationButtonProps {
      previousModule: number;
      handlePrevious: () => void;
      disabled: boolean;
}

const BackNavigationButton: React.FC<BackNavigationButtonProps> = ({
      previousModule,
      handlePrevious,
      disabled,
}) => {
      return (
            <div className="back-navigation-button flex justify-start mt-8">
                  <Button onClick={handlePrevious} disabled={disabled}>
                        <FaArrowLeft className="mr-4" />
                        Module {previousModule}:{" "}
                        {/* Add the previous module's title or description if available */}
                  </Button>
            </div>
      );
};

export default BackNavigationButton;
