import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layouts/Main";
import DynamicContentLayout from "../components/DynamicContentLayout";
import { getChapterById } from "../services/moduleService";

interface ChapterData {
      title: string;
      description: string;
      content: {
            type: "text" | "video";
            url: string;
      };
}

const Chapter = () => {
      const { module } = useParams();
      const [chapters, setChapters] = useState<ChapterData[]>([]);

      useEffect(() => {
            const fetchChapter = async () => {
                  try {
                        const _chapters = await getChapterById(module!); // Assume this returns an array of chapters
                        setChapters(_chapters);
                        console.log("chapters", _chapters);
                  } catch (error) {
                        console.error("Error fetching chapters:", error);
                  }
            };
            fetchChapter();
      }, [module]);

      if (chapters.length === 0) {
            return <p>Loading chapters...</p>;
      }

      return (
            <Layout moduleId={module!}>
                  <DynamicContentLayout chapter={chapters} currentModule={module!} />
            </Layout>
      );
};

export default Chapter;
