/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Input, Textarea, Heading, Text, Select } from "@chakra-ui/react";
import { useState } from "react";

interface CourseInfoFormProps {
      title: string;
      description: string;
      setModule: (module: {
            title: string;
            description: string;
            content?: {
                  type: "text" | "video";
                  url: string;
            };
      }) => void;
}

const CourseInfoForm: React.FC<CourseInfoFormProps> = ({ title, description, setModule }) => {
      // Local state for content fields
      const [contentType, setContentType] = useState<"text" | "video">("text");
      const [contentUrl, setContentUrl] = useState("");

      // Update module including content fields
      const handleSetModule = () => {
            setModule({
                  title,
                  description,
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
                              onChange={(e) => setModule({ title: e.target.value, description })}
                        />
                        <Text fontSize="sm" mt={2}>
                              Please see our course title guideline
                        </Text>
                  </Box>

                  {/* Description */}
                  <Box mb={6}>
                        <Heading size="sm" mb={2}>
                              Description
                        </Heading>
                        <Textarea
                              placeholder="Shortly describe this course."
                              value={description}
                              onChange={(e) => setModule({ title, description: e.target.value })}
                        />
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
