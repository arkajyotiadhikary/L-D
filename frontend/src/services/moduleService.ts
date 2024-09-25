/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// const API_BASE_URL = "https://lizmotors-app.onrender.com"; // Replace with your backend API base URL
const API_BASE_URL = "http://localhost:8000";
// Create an instance of axios with base URL

const api = axios.create({
      baseURL: API_BASE_URL,
});

// Add an interceptor to include the JWT token in the Authorization header
api.interceptors.request.use(
      (config) => {
            const token = localStorage.getItem("authToken"); // Get token from localStorage or another secure location
            if (token) {
                  config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
      },
      (error) => {
            return Promise.reject(error);
      }
);

// Function to upload a video
export const uploadVideo = async (formData: FormData) => {
      try {
            const response = await api.post("/api/videos/upload", formData, {
                  headers: {
                        "Content-Type": "multipart/form-data",
                  },
            });
            return response.data;
      } catch (error) {
            console.error("Error uploading video:", error);
            throw error;
      }
};

// Function to upload a module
export const uploadModule = async (formData: FormData) => {
      try {
            const response = await api.post("/api/modules", formData, {
                  headers: {
                        "Content-Type": "multipart/form-data",
                  },
            });
            return response.data;
      } catch (error: any) {
            console.error("Error uploading module:", error.response?.data || error.message);
            throw error; // Ensure the error is propagated
      }
};

// Function to get video details
export const getVideoDetails = async (videoId: string) => {
      try {
            const response = await api.get(`/api/videos/${videoId}`);
            return response.data;
      } catch (error) {
            console.error("Error fetching video details:", error);
            throw error;
      }
};

// Function to get all videos
export const getAllVideos = async () => {
      try {
            const response = await api.get("/api/videos");
            return response.data;
      } catch (error) {
            console.error("Error fetching all videos:", error);
      }
};

export const getCurrentModule = async ({ moduleId }: { moduleId: string }) => {
      try {
            const response = await api.get(`/api/modules/${moduleId}`);
            return response.data;
      } catch (error) {
            console.error("Error fetching current video:", error);
      }
};

export const updateUserProgress = async (
      userId: string,
      currentModule: string,
      completedModule?: string
) => {
      try {
            const response = await api.put(`/api/users/${userId}/progress`, {
                  currentModule,
                  completedModule,
            });
            return response.data;
      } catch (error: any) {
            console.error("Error updating user progress:", error.response?.data || error.message);
            throw error;
      }
};

// Function to get user progress
export const getUserProgress = async (userId: string) => {
      try {
            const response = await api.get(`/api/users/${userId}/progress`);
            return response.data;
      } catch (error) {
            console.error("Error fetching user progress:", error);
            throw error;
      }
};
