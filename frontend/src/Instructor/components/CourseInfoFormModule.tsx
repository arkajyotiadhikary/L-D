/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Box, Input, Heading, Text } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

// Define the structure for the module

interface Chapter {
      _id: string;
      title: string;
      description?: string;
      order: number;
      content?: {
            type: "text" | "video";
            url: string;
      };
}
interface Module {
      _id?: string;
      title?: string;
      description?: string;
      order?: number;
      imgUrl?: string;
      chapters?: Chapter[];
}

// Define the props for the CourseInfoForm component
interface CourseInfoFormProps {
      module: Module;
      setModule: React.Dispatch<React.SetStateAction<Module>>;
}

const CourseInfoForm: React.FC<CourseInfoFormProps> = ({ module, setModule }) => {
      // Local state for title and description
      const [localTitle, setLocalTitle] = useState<string>(module.title!);
      const [localDescription, setLocalDescription] = useState<string>(module.description!);

      // Synchronize local state with the parent component
      useEffect(() => {
            console.log("Synchronizing local state with parent:", localTitle, localDescription);
            setModule((prevModule) => ({
                  ...prevModule,
                  title: localTitle,
                  description: localDescription,
            }));
      }, [localTitle, localDescription, setModule]);

      return (
            <Box>
                  <Heading size="md" mb={4}>
                        Basic Information
                  </Heading>

                  {/* Title Section */}
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
                              Please see our course title guidelines.
                        </Text>
                  </Box>

                  {/* Description Section */}
                  <Box mb={6}>
                        <Heading size="sm" mb={2}>
                              Description
                        </Heading>
                        <Box
                              mb={2}
                              p={2}
                              border="1px solid #E2E8F0"
                              borderRadius="md"
                              minH="200px" // Ensures the editor has a minimum height
                        >
                              <ReactQuill
                                    value={localDescription}
                                    onChange={(value) => setLocalDescription(value)}
                                    theme="snow" // Specify the theme explicitly
                                    placeholder="Shortly describe this course."
                              />
                        </Box>
                        <Text fontSize="sm" mt={2}>
                              Briefly describe this course.
                        </Text>
                  </Box>
            </Box>
      );
};

export default CourseInfoForm;
