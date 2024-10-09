// SectionsList.tsx

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
      arrayMove,
      SortableContext,
      useSortable,
      verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box, Button, Heading, IconButton } from "@chakra-ui/react";
import { FaGripVertical } from "react-icons/fa";
import Section from "./Section";
import { useNavigate } from "react-router-dom";

interface Chapter {
      _id: string;
      title: string;
      description?: string;
      content?: {
            type: "text" | "video";
            url: string;
      };
      order: number; // Ensure that the Chapter interface includes the order field
}

interface SectionsListProps {
      chapters: Chapter[];
      moduleId: string;
      onReorder: (newChapters: Chapter[]) => void;
}

const SortableItem: React.FC<{ chapter: Chapter; moduelId: string }> = ({ chapter, moduelId }) => {
      const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
            id: chapter._id,
      });

      const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            boxShadow: isDragging ? "0 4px 8px rgba(0,0,0,0.2)" : "none",
            background: "white",
            borderRadius: "md",
            padding: "8px",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
      };

      return (
            <Box ref={setNodeRef} style={style} {...attributes}>
                  {/* Drag Handle */}
                  <IconButton
                        aria-label="Drag Handle"
                        icon={<FaGripVertical />}
                        mr={4}
                        cursor="grab"
                        {...listeners}
                        variant="ghost"
                        size="sm"
                  />

                  {/* Section Content */}
                  <Box flex="1">
                        <Section title={chapter.title} _id={chapter._id} moduleId={moduelId} />
                  </Box>
            </Box>
      );
};

const SectionsList: React.FC<SectionsListProps> = ({ chapters, moduleId, onReorder }) => {
      const navigate = useNavigate();

      /**
       * Handles the drag end event.
       * Reorders the chapters array and updates the `order` field based on the new index.
       *
       * @param event - The drag end event from DnD Kit.
       */
      const handleDragEnd = (event: DragEndEvent) => {
            const { active, over } = event;

            if (active.id !== over?.id) {
                  const oldIndex = chapters.findIndex((item) => item._id === active.id);
                  const newIndex = chapters.findIndex((item) => item._id === over?.id);

                  // Use arrayMove to reorder the chapters array
                  const reorderedChapters = arrayMove(chapters, oldIndex, newIndex);

                  // Assign the `order` field based on the new index (1-based)
                  const updatedChapters = reorderedChapters.map((chapter, index) => ({
                        ...chapter,
                        order: index + 1,
                  }));

                  console.log(
                        "Reordered Chapters with updated order:",
                        updatedChapters.map((c) => ({ title: c.title, order: c.order }))
                  );

                  // Call the onReorder prop with the updated chapters
                  onReorder(updatedChapters);
            } else {
                  // If the dragged item is dropped over itself, ensure the order fields are consistent
                  const updatedChapters = chapters.map((chapter, index) => ({
                        ...chapter,
                        order: index + 1,
                  }));

                  console.log(
                        "Chapters after no change:",
                        updatedChapters.map((c) => ({ title: c.title, order: c.order }))
                  );

                  onReorder(updatedChapters);
            }
      };

      return (
            <Box mt={8}>
                  <Heading size="md" mb={4}>
                        Chapters
                  </Heading>

                  <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext
                              items={chapters.map((item) => item._id)}
                              strategy={verticalListSortingStrategy}
                        >
                              <Box>
                                    {chapters.map((chapter) => (
                                          <SortableItem
                                                key={chapter._id}
                                                chapter={chapter}
                                                moduelId={moduleId}
                                          />
                                    ))}
                              </Box>
                        </SortableContext>
                  </DndContext>

                  <Button
                        mt={4}
                        variant="outline"
                        onClick={() => navigate(`/instructor/chapter/new/${moduleId}`)}
                  >
                        Add Section
                  </Button>
            </Box>
      );
};

export default SectionsList;
