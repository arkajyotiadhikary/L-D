/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Input, Heading, Text, Select } from "@chakra-ui/react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

interface CourseInfoFormProps {
      title: string;
      description: string;
      url: string;
      setModule: (module: {
            title: string;
            description: string;
            content?: {
                  type: "text" | "video";
                  url: string;
            };
      }) => void;
}

const CourseInfoForm: React.FC<CourseInfoFormProps> = ({ title, description, url, setModule }) => {
      // Local state for content fields
      const [contentType, setContentType] = useState<"text" | "video">("text");
      const [contentUrl, setContentUrl] = useState(url || "");

      // Editor state for description
      const [editorState, setEditorState] = useState(description || "");

      // Update module including content fields and rich text description
      const handleSetModule = () => {
            setModule({
                  title,
                  description: editorState,
                  content: {
                        type: contentType,
                        url: contentUrl,
                  },
            });
      };

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
                              value={title}
                              onChange={(e) =>
                                    setModule({ title: e.target.value, description: editorState })
                              }
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
                                    value={editorState}
                                    onChange={(value) => {
                                          setEditorState(value);
                                          handleSetModule();
                                    }}
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
                              onChange={(e) => {
                                    setContentType(e.target.value as "text" | "video");
                                    handleSetModule();
                              }}
                        >
                              <option value="text">Text</option>
                              <option value="video">Video</option>
                        </Select>
                        <Input
                              placeholder="Enter content URL"
                              value={contentUrl}
                              onChange={(e) => {
                                    setContentUrl(e.target.value);
                                    handleSetModule();
                              }}
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
