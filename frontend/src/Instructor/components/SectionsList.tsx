import { Box, Button, Heading } from "@chakra-ui/react";
import Section from "./Section";
import { useNavigate } from "react-router-dom";

interface SectionsListProps {
      chapters: {
            _id?: string;
            title?: string;
            description?: string;
            content?: {
                  type: "text" | "video";
                  url: string;
            };
      }[];
      moduleId: string;
}
const SectionsList: React.FC<SectionsListProps> = ({ chapters, moduleId }) => {
      const navigation = useNavigate();
      return (
            <Box mt={8}>
                  <Heading size="md" mb={4}>
                        Chapters
                  </Heading>

                  {chapters.map((section, index) => (
                        <Section key={index} title={section.title!} _id={section._id!} />
                  ))}

                  <Button
                        mt={4}
                        variant="outline"
                        onClick={() => navigation(`/instructor/chapter/new/${moduleId}`)}
                  >
                        Add Section
                  </Button>
            </Box>
      );
};

export default SectionsList;
