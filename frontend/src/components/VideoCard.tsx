import { Box, HStack, Button, Progress, Text, Flex } from "@chakra-ui/react";

const VideoCard = ({
      title,
      description,
      progress,
      completion,
      onClick,
}: {
      title: string;
      description: string;
      content: { type: "video" | "text"; url: string };
      progress: number;
      completion?: "completed" | "progress" | "incomplete";
      onClick: () => void;
}) => (
      <Box
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
            mb={4}
            boxShadow="sm"
            transition="all 0.2s"
            _hover={{
                  cursor: completion === "incomplete" ? "not-allowed" : "pointer",
                  boxShadow: completion === "incomplete" ? "sm" : "md",
            }}
            onClick={completion === "incomplete" ? undefined : onClick}
      >
            <Flex justify="space-between" align="center" mb={3}>
                  <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
                        {title}
                  </Text>
                  <Button
                        size="sm"
                        colorScheme={completion === "completed" ? "green" : "blue"}
                        variant="outline"
                        isDisabled={completion === "incomplete"}
                  >
                        {completion === "completed" ? "Review" : "Start"}
                  </Button>
            </Flex>

            <Box
                  fontSize="sm"
                  color="gray.600"
                  mb={3}
                  noOfLines={2}
                  dangerouslySetInnerHTML={{ __html: description }}
            />
            <HStack spacing={3} align="center">
                  <Progress
                        value={progress}
                        flex="1"
                        size="sm"
                        colorScheme={completion === "completed" ? "green" : "blue"}
                        borderRadius="full"
                  />
                  <Text
                        fontSize="sm"
                        fontWeight="medium"
                        color="gray.600"
                        minWidth="45px"
                        textAlign="right"
                  >
                        {progress}%
                  </Text>
            </HStack>
      </Box>
);

export default VideoCard;
