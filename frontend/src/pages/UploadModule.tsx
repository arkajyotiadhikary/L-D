import React, { useState } from "react";
import TiptapEditor from "../components/TipTapEditor"; // Ensure this import path is correct
import { uploadVideo, uploadModule } from "../services/moduleService";

const UploadModule: React.FC = () => {
      const [title, setTitle] = useState("");
      const [video, setVideo] = useState<File | null>(null);
      const [content, setContent] = useState("Test Content");
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const [success, setSuccess] = useState<string | null>(null);

      const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                  setVideo(e.target.files[0]);
            }
      };

      const handleContentChange = (content: string) => {
            setContent(content);
      };

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            if (!title || !video) {
                  setError("Title and video file are required.");
                  return;
            }

            setLoading(true);
            setError(null);

            try {
                  // Create FormData for video upload
                  const videoFormData = new FormData();
                  videoFormData.append("video", video);

                  // Upload video
                  const videoResponse = await uploadVideo(videoFormData);
                  const videoId = videoResponse._id; // Adjust this based on your API response

                  // Create FormData for module upload
                  const moduleFormData = new FormData();
                  moduleFormData.append("title", title);
                  moduleFormData.append("content", content);
                  moduleFormData.append("videoId", videoId);

                  // Log FormData entries for debugging
                  for (let [key, value] of moduleFormData.entries()) {
                        console.log(`${key}: ${value}`);
                  }

                  // Upload module
                  await uploadModule(moduleFormData);

                  setSuccess("Module uploaded successfully.");
            } catch (error) {
                  console.error("Error uploading module:", error);
                  setError("Failed to upload module.");
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="container mx-auto p-4 min-h-screen">
                  <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Module Title
                              </label>
                              <input
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                              />
                        </div>
                        <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Upload Video
                              </label>
                              <input
                                    type="file"
                                    accept="video/*"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={handleVideoUpload}
                              />
                        </div>
                        <div className="mb-4">
                              <TiptapEditor value={content} onChange={handleContentChange} />
                        </div>
                        {loading && <div className="text-blue-500">Uploading...</div>}
                        {error && <div className="text-red-500">{error}</div>}
                        {success && <div className="text-green-500">{success}</div>}
                        <button
                              type="submit"
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                              Upload Module
                        </button>
                  </form>
            </div>
      );
};

export default UploadModule;
