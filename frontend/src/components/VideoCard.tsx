import { Box, HStack, Button, Progress, Text } from "@chakra-ui/react";

const VideoCard = ({
      title,
      progress,
      completed,
}: {
      title: string;
      progress: number;
      completed: boolean;
}) => (
      <Box p={4} borderWidth="1px" borderRadius="md" bg="white" mb={4}>
            <HStack justify="space-between">
                  <Text fontWeight="bold">{title}</Text>
                  <Button size="sm">{completed ? "Play Again" : "Play"}</Button>
            </HStack>
            <Progress value={progress} mt={2} />
            <HStack justify="space-between" mt={2}>
                  <Text>{progress}% Completed</Text>
                  <Text>{completed ? "Completed" : "In Progress"}</Text>
            </HStack>
      </Box>
);
export default VideoCard;
