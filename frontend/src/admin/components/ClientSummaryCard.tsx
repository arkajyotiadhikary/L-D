import {
      Box,
      Text,
      Heading,
      CircularProgress,
      CircularProgressLabel,
      HStack,
      VStack,
} from "@chakra-ui/react";

interface ClientSummaryCardProps {
      title: string;
      value: number;
      description: string;
      progress?: number;
}

const ClientSummaryCard: React.FC<ClientSummaryCardProps> = ({
      title,
      value,
      description,
      progress,
}) => {
      return (
            <HStack
                  p={6}
                  borderWidth="1px"
                  borderRadius="md"
                  boxShadow="md"
                  justifyContent={"space-between"}
            >
                  <VStack align="start">
                        <Heading size="md">{title}</Heading>
                        <Text fontSize="2xl" fontWeight="bold">
                              {value}
                        </Text>
                        <Text>{description}</Text>
                  </VStack>
                  <Box>
                        {progress !== undefined && (
                              <CircularProgress
                                    value={progress}
                                    size="80px"
                                    color="purple.400"
                                    mt={2}
                              >
                                    <CircularProgressLabel>{progress}%</CircularProgressLabel>
                              </CircularProgress>
                        )}
                  </Box>
            </HStack>
      );
};

export default ClientSummaryCard;
