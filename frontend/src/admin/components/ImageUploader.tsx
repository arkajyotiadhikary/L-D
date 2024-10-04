import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

interface ImageUploaderProps {
      image: string;
      setImage: (imgUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ setImage }) => {
      const [file, setFile] = useState<File | null>(null);
      const [previewUrl, setPreviewUrl] = useState<string | null>(null);

      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = event.target.files?.[0];
            if (selectedFile) {
                  setFile(selectedFile);
                  setPreviewUrl(URL.createObjectURL(selectedFile));
            }
      };

      const handleUpload = () => {
            if (file) {
                  // Implement the actual upload logic here
                  // For example, using FormData to upload to a server
                  const reader = new FileReader();
                  reader.onloadend = () => {
                        setImage(reader.result as string); // Set the image URL in the parent component
                  };
                  reader.readAsDataURL(file);
            }
      };

      return (
            <Box borderWidth="1px" borderRadius="md" p={4} bg="white">
                  <Text mb={2}>Upload an Image</Text>
                  {previewUrl && (
                        <Box mb={2}>
                              <img src={previewUrl} alt="Preview" style={{ width: "100%" }} />
                        </Box>
                  )}
                  <Input type="file" accept="image/*" onChange={handleFileChange} />
                  <Button mt={2} colorScheme="teal" onClick={handleUpload}>
                        Upload
                  </Button>
            </Box>
      );
};

export default ImageUploader;
