import { Box, Image } from "@chakra-ui/react";

interface ImagePreviewProps {
      imageUrl?: string; // Optional image URL, can default to a placeholder if not provided
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl }) => {
      return (
            <Box
                  maxW="100%"
                  maxH="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  overflow="hidden"
            >
                  <Image
                        src={imageUrl || "https://via.placeholder.com/800x450"} // Default placeholder image
                        alt="Preview"
                        objectFit="contain"
                        maxW="100%"
                        maxH="100%"
                  />
            </Box>
      );
};

export default ImagePreview;
