import { Box, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { FaPlay } from "react-icons/fa";

const VideoPreview = ({
      videoUrl,
      title,
      height,
}: {
      videoUrl: string;
      title: string;
      height: React.CSSProperties["height"];
}) => {
      return (
            <Box position="relative" w="100%" _hover={{ cursor: "pointer" }}>
                  {/* Video Preview Container */}
                  <Box
                        bg={"black"}
                        h={height}
                        borderRadius="md"
                        overflow="hidden"
                        position="relative"
                  >
                        {/* Title */}
                        <Text
                              position="absolute"
                              bottom="0"
                              left="0"
                              p={8}
                              fontSize="3xl"
                              color="white"
                        >
                              {title}
                        </Text>
                        {/* Video Preview */}
                        <video src={videoUrl} style={{ width: "100%", height: "100%" }} />
                  </Box>

                  {/* Play Button */}
                  <IconButton
                        aria-label="Play Video"
                        icon={<FaPlay />}
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        size="xl"
                        variant="ghost"
                        fontSize="4xl"
                  />
            </Box>
      );
};

export default VideoPreview;
