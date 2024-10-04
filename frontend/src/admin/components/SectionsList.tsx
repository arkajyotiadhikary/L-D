import { Box, Button, Heading } from "@chakra-ui/react";
import Section from "./Section";

interface SectionsListProps {
      chapters: { title: string }[];
}
const SectionsList: React.FC<SectionsListProps> = ({ chapters }) => {
      return (
            <Box mt={8}>
                  <Heading size="md" mb={4}>
                        Chapters
                  </Heading>

                  {chapters.map((section, index) => (
                        <Section key={index} title={section.title} />
                  ))}

                  <Button mt={4} variant="outline">
                        Add Section
                  </Button>
            </Box>
      );
};

export default SectionsList;
