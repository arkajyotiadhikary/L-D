import { Box, Text } from "@chakra-ui/react";

const ModuleDescription = () => {
      return (
            <Box mt={8} mb={16} px={4} maxW="xl" mx="auto">
                  <Text fontSize="lg" color="gray.700" lineHeight="tall" textAlign="justify">
                        This training module is designed to educate employees on the Prevention of
                        Sexual Harassment (POSH) at the workplace. The module covers the legal
                        framework, types of sexual harassment, rights and responsibilities of
                        employees, reporting mechanisms, and the consequences of non-compliance. It
                        aims to create a safe and respectful work environment where all employees
                        feel valued and protected.
                  </Text>
            </Box>
      );
};

export default ModuleDescription;
