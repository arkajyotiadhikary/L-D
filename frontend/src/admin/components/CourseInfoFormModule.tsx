/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Box, Input, Heading, Text } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
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
      useEffect(() => {
            setModule({ title, description });
            setEditorState(description || "");
      }, [description, setModule, title]);

      const [editorState, setEditorState] = useState(description || "");

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
                        <Box mb={2} p={2} border="1px solid #E2E8F0" borderRadius="md">
                              <ReactQuill
                                    value={editorState}
                                    onChange={(value) => {
                                          setEditorState(value);
                                          setModule({ title, description: value });
                                    }}
                              />
                        </Box>
                        <Text fontSize="sm" mt={2}>
                              Shortly describe this course.
                        </Text>
                  </Box>
            </Box>
      );
};

export default CourseInfoForm;
