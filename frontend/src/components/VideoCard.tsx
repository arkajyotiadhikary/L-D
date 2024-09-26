import { Box, HStack, Button, Progress, Text } from "@chakra-ui/react";

const VideoCard = ({
      title,
      progress,
      completed,
      onClick,
}: {
      title: string;
      progress: number;
      completed: boolean;
      onClick: () => void;
}) => (
      <Box
            p={4}
            borderWidth="1px"
            borderRadius="md"
            bg="white"
            mb={4}
            onClick={onClick}
            _hover={{ cursor: "pointer" }}
      >
            <HStack justify="space-between">
                  <Text fontWeight="bold">{title}</Text>
                  <Button size="sm" border={"1px"} borderRadius="md">
                        {completed ? "Play Again" : "Play"}
                  </Button>
            </HStack>
            <Progress
                  value={progress}
                  mt={2}
                  colorScheme="green"
                  bgColor="#ECECEC"
                  borderRadius="md"
                  borderColor="green.500"
            />
      </Box>
);
export default VideoCard;
