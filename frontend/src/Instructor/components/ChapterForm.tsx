/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Input, Flex, Select } from "@chakra-ui/react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const ChapterForm = ({ index, chapter, updateChapter, removeChapter }: any) => {
      // Initialize editor state for description
      const [editorState, setEditorState] = useState(chapter.description || "");

      // Handle input changes (title and content)
      const handleInputChange = (e: any) => {
            const { name, value } = e.target;
            const updatedChapter = { ...chapter, [name]: value };
            updateChapter(index, updatedChapter);
      };

      // Handle content changes (type and url)
      const handleContentChange = (e: any) => {
            const { name, value } = e.target;
            const updatedChapter = { ...chapter, content: { ...chapter.content, [name]: value } };
            updateChapter(index, updatedChapter);
      };

      // Handle React Quill editor changes
      const handleEditorChange = (value: string) => {
            setEditorState(value);
            const updatedChapter = { ...chapter, description: value };
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

                  {/* React Quill for description */}
                  <Box mb={2} p={2} border="1px solid #E2E8F0" borderRadius="md">
                        <ReactQuill value={editorState} onChange={handleEditorChange} />
                  </Box>

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
