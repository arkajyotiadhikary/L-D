import { Box, Input, Textarea, Heading, Text } from "@chakra-ui/react";

interface CourseInfoFormProps {
      title: string;
      description: string;
      setModule: (module: { title: string; description: string }) => void;
}

const CourseInfoForm: React.FC<CourseInfoFormProps> = ({ title, description, setModule }) => {
      console.log(title, description);
      return (
            <Box>
                  <Heading size="md" mb={4}>
                        Basic Information
                  </Heading>

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

                  <Box>
                        <Heading size="sm" mb={2}>
                              Description
                        </Heading>
                        <Textarea
                              placeholder="Shortly describe this course."
                              value={description}
                        ></Textarea>
                        <Text fontSize="sm" mt={2}>
                              Shortly describe this course.
                        </Text>
                  </Box>
            </Box>
      );
};

export default CourseInfoForm;
