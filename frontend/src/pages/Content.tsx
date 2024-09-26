import { useParams } from "react-router-dom";
import Layout from "../layouts/Main";
import DynamicContentLayout from "../components/DynamicContentLayout";

const Content = () => {
      const { id } = useParams(); // Get the 'id' from URL params
      const chapterId = parseInt(id || "0", 10);

      // Convert id to a number, fallback to 1 if id is not a valid number

      // Define the data for multiple chapters
      const chaptersData = [
            {
                  title: "Introduction",
                  description:
                        "Welcome to the world of sexual harassment prevention training. This training is designed to provide you with the knowledge and skills necessary to recognize and prevent sexual harassment in the workplace. It is a comprehensive training that covers the legal definition of sexual harassment, the different forms of sexual harassment, and the steps you can take to prevent it. This training is designed to be interactive and engaging, and it includes a variety of exercises and quizzes to help you understand the material. ",
                  imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
                  videoUrl: "https://youtu.be/gsnqXt7d1mU?si=pm4wJAJKYGqOYPot",
                  contentType: "video",
            },
            {
                  title: "Into the Unknown",
                  description:
                        "Sexual harassment is any unwelcome behavior of a sexual nature that creates an intimidating, hostile, or offensive environment. It can involve verbal, non-verbal, or physical actions, ranging from inappropriate comments and gestures to unwanted touching or advances. Sexual harassment is typically defined by its impact on the victim, rather than the intent of the perpetrator. It violates personal boundaries and is considered unlawful in most professional and educational settings, as it undermines an individual's dignity, safety, and right to equal treatment.",
                  imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
                  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                  contentType: "video",
            },
            {
                  title: "The Discovery",
                  description:
                        "Sexual harassment is any unwelcome behavior of a sexual nature that creates an intimidating, hostile, or offensive environment. It can involve verbal, non-verbal, or physical actions, ranging from inappropriate comments and gestures to unwanted touching or advances. Sexual harassment is typically defined by its impact on the victim, rather than the intent of the perpetrator. It violates personal boundaries and is considered unlawful in most professional and educational settings, as it undermines an individual's dignity, safety, and right to equal treatment.",
                  imageUrl: "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
                  videoUrl: "https://www.youtube.com/watch?v=Vbks4abvLEw",
                  contentType: "text",
            },
            {
                  title: "A New Journey",
                  description:
                        "Sexual harassment is any unwelcome behavior of a sexual nature that creates an intimidating, hostile, or offensive environment. It can involve verbal, non-verbal, or physical actions, ranging from inappropriate comments and gestures to unwanted touching or advances. Sexual harassment is typically defined by its impact on the victim, rather than the intent of the perpetrator. It violates personal boundaries and is considered unlawful in most professional and educational settings, as it undermines an individual's dignity, safety, and right to equal treatment.",
                  imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                  videoUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
                  contentType: "text",
            },
            {
                  title: "The Final Frontier",
                  description:
                        "Sexual harassment is any unwelcome behavior of a sexual nature that creates an intimidating, hostile, or offensive environment. It can involve verbal, non-verbal, or physical actions, ranging from inappropriate comments and gestures to unwanted touching or advances. Sexual harassment is typically defined by its impact on the victim, rather than the intent of the perpetrator. It violates personal boundaries and is considered unlawful in most professional and educational settings, as it undermines an individual's dignity, safety, and right to equal treatment.",
                  imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
                  videoUrl: "https://www.youtube.com/watch?v=5qap5aO4i9A",
                  contentType: "video",
            },
      ];

      // Get the chapter data based on the chapter parameter from the URL
      const chapterData = chaptersData[chapterId - 1] || chaptersData["0"]; // Default to Chapter 1 if no valid chapter is found

      return (
            <Layout>
                  <DynamicContentLayout chapterData={chapterData} />
            </Layout>
      );
};

export default Content;
