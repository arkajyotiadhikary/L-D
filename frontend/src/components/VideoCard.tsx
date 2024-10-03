import { Box, HStack, Button, Progress, Text } from "@chakra-ui/react";

const VideoCard = ({
      title,
      progress,
      completion,
      onClick,
}: {
      description: string;
      content: { type: "video" | "text"; url: string };
      title: string;
      progress: number;
      completion?: "completed" | "progress" | "incomplete";
      onClick: () => void;
}) => (
      <Box
            p={4}
            borderWidth="1px"
            borderRadius="md"
            bg="white"
            mb={4}
            onClick={onClick}
            _hover={{ cursor: completion === "incomplete" ? "not-allowed" : "pointer" }}
            pointerEvents={completion === "incomplete" ? "none" : "auto"}
      >
            <HStack justify="space-between">
                  <Text fontWeight="bold">{title}</Text>
                  <Button
                        size="sm"
                        border={"1px"}
                        borderRadius="md"
                        isDisabled={completion === "incomplete"}
                  >
                        {completion === "completed" ? "Play Again" : "Play"}
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
