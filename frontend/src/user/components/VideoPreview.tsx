import { Box, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";

const VideoPreview = ({
      videoUrl,
      title,
      height,
}: {
      videoUrl: string;
      title: string;
      height: React.CSSProperties["height"];
}) => {
      const [playing, setPlaying] = React.useState(false);

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
                        <ReactPlayer
                              url={videoUrl}
                              playing={playing}
                              width="100%"
                              height="100%"
                              controls={true}
                              style={{ zIndex: 1 }}
                        />
                  </Box>

                  {/* Play Button */}
                  {!playing && (
                        <IconButton
                              position="absolute"
                              top="50%"
                              left="50%"
                              transform="translate(-50%, -50%)"
                              size="lg"
                              icon={<FaPlay />}
                              onClick={() => setPlaying(true)}
                              aria-label={""}
                        />
                  )}
            </Box>
      );
};

export default VideoPreview;
