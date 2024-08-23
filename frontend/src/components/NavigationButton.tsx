import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Button } from '@chakra-ui/react';

interface NavigationButtonProps {
  nextModule: number;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ nextModule }) => {
  return (
    <div className="navigation-button flex justify-end mt-8">
      <Button>
        Module {nextModule}: Fire Safety and Prevention <FaArrowRight className="ml-4" />
      </Button>
    </div>
  )
};

export default NavigationButton;
