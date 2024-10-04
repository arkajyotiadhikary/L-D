/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Input, Textarea, Heading, Text } from "@chakra-ui/react";

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

      // Update module including content fields

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
            </Box>
      );
};

export default CourseInfoForm;
