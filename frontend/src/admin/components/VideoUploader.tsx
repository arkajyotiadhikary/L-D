import { Box, Input, Heading, Image } from "@chakra-ui/react";

const VideoUploader: React.FC = () => {
      return (
            <Box>
                  <Heading size="sm" mb={4}>
                        Video
                  </Heading>
                  <Image
                        src="https://player.vimeo.com/video/972432"
                        alt="Course video preview"
                        borderRadius="md"
                        mb={4}
                  />
                  <Input
                        placeholder="Enter a valid video URL."
                        value="https://player.vimeo.com/video/972432"
                  />
            </Box>
      );
};

export default VideoUploader;
