import { Box, Image, IconButton } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";

const VideoPreview = () => {
      return (
            <Box position="relative" w="full" h="auto" _hover={{ cursor: "pointer" }}>
                  {/* Image Preview */}
                  <Image
                        src="https://via.placeholder.com/640x360?text=Video+Preview"
                        alt="Video Preview"
                        borderRadius="md"
                        w="full"
                  />

                  {/* Play Button */}
                  <IconButton
                        aria-label="Play Video"
                        icon={<FaPlay />}
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        size="lg"
                        colorScheme="whiteAlpha"
                        color="black"
                        bg="white"
                        borderRadius="full"
                  />
            </Box>
      );
};

export default VideoPreview;
