/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Input, Heading, Text, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import useDebounce from "../../hooks/useDebounce";

interface CourseInfoFormProps {
      title: string;
      description: string;
      url: string;
      setModule: (module: {
            title?: string;
            description?: string;
            content?: {
                  type: "text" | "video";
                  url: string;
            };
      }) => void;
}

const CourseInfoForm: React.FC<CourseInfoFormProps> = ({ title, description, url, setModule }) => {
      // Local state for form fields
      const [localTitle, setLocalTitle] = useState<string>(title);
      const [localDescription, setLocalDescription] = useState<string>(description);
      const [contentType, setContentType] = useState<"text" | "video">("text");
      const [contentUrl, setContentUrl] = useState<string>(url || "");

      // Synchronize local state with props
      useEffect(() => {
            setLocalTitle(title);
      }, [title]);

      useEffect(() => {
            setLocalDescription(description);
      }, [description]);

      useEffect(() => {
            setContentUrl(url || "");
      }, [url]);

      // Debounced values
      const debouncedTitle = useDebounce<string>(localTitle, 500);
      const debouncedDescription = useDebounce<string>(localDescription, 500);
      const debouncedContentUrl = useDebounce<string>(contentUrl, 500);

      /**
       * Handles updating the module state.
       * Consolidates debounced form fields to update the parent component.
       */
      useEffect(() => {
            setModule({
                  title: debouncedTitle,
                  description: debouncedDescription,
                  content: {
                        type: contentType,
                        url: debouncedContentUrl,
                  },
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [debouncedTitle, debouncedDescription, debouncedContentUrl, contentType]);

      return (
            <Box>
                  <Heading size="md" mb={4}>
                        Basic Information
                  </Heading>

                  {/* Title */}
                  <Box mb={6}>
                        <Heading size="sm" mb={2}>
                              Course Title
                        </Heading>
                        <Input
                              placeholder="Enter course title"
                              value={localTitle}
                              onChange={(e) => setLocalTitle(e.target.value)}
                        />
                        <Text fontSize="sm" mt={2}>
                              Please see our course title guideline
                        </Text>
                  </Box>

                  {/* Description with React Quill */}
                  <Box mb={6}>
                        <Heading size="sm" mb={2}>
                              Description
                        </Heading>
                        <Box mb={2} p={2} border="1px solid #E2E8F0" borderRadius="md">
                              <ReactQuill
                                    value={localDescription}
                                    onChange={(value) => setLocalDescription(value)}
                              />
                        </Box>
                        <Text fontSize="sm" mt={2}>
                              Shortly describe this course.
                        </Text>
                  </Box>

                  {/* Content Type and URL */}
                  <Box mb={6}>
                        <Heading size="sm" mb={2}>
                              Content Type
                        </Heading>
                        <Select
                              value={contentType}
                              onChange={(e) => setContentType(e.target.value as "text" | "video")}
                        >
                              <option value="text">Text</option>
                              <option value="video">Video</option>
                        </Select>
                        <Input
                              placeholder="Enter content URL"
                              value={contentUrl}
                              onChange={(e) => setContentUrl(e.target.value)}
                              mt={4}
                        />
                        <Text fontSize="sm" mt={2}>
                              Provide the URL for the course content.
                        </Text>
                  </Box>
            </Box>
      );
};

export default CourseInfoForm;
