/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Input, Textarea, Flex, Select } from "@chakra-ui/react";

const ChapterForm = ({ index, chapter, updateChapter, removeChapter }: any) => {
      const handleInputChange = (e: any) => {
            const { name, value } = e.target;
            const updatedChapter = { ...chapter, [name]: value };
            updateChapter(index, updatedChapter);
      };

      const handleContentChange = (e: any) => {
            const { name, value } = e.target;
            const updatedChapter = { ...chapter, content: { ...chapter.content, [name]: value } };
            updateChapter(index, updatedChapter);
      };

      return (
            <Box mb={4} p={4} borderWidth={1} borderRadius="md">
                  <Flex justify="space-between" mb={2}>
                        <Input
                              placeholder="Chapter Title"
                              name="title"
                              value={chapter.title}
                              onChange={handleInputChange}
                              mr={2}
                        />
                        <Button colorScheme="red" onClick={() => removeChapter(index)}>
                              Remove
                        </Button>
                  </Flex>
                  <Textarea
                        placeholder="Chapter Description"
                        name="description"
                        value={chapter.description}
                        onChange={handleInputChange}
                        mb={2}
                  />
                  <Flex>
                        <Select
                              name="type"
                              value={chapter.content.type}
                              onChange={handleContentChange}
                              mr={2}
                        >
                              <option value="text">Text</option>
                              <option value="video">Video</option>
                        </Select>
                        <Input
                              placeholder="Content URL"
                              name="url"
                              value={chapter.content.url}
                              onChange={handleContentChange}
                        />
                  </Flex>
            </Box>
      );
};

export default ChapterForm;
