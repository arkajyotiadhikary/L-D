import axios from "axios";

const API_BASE_URL = "https://lizmotor.onrender.com";
// const API_BASE_URL = "http://localhost:8000";

// Create an instance of axios with base URL
const api = axios.create({
      baseURL: API_BASE_URL,
});

api.interceptors.request.use(
      (config) => {
            const token = localStorage.getItem("token"); // Get token from localStorage or another secure location
            if (token) {
                  config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
      },
      (error) => {
            return Promise.reject(error);
      }
);

export const updateUserProgress = async (currentModule: string, completedModule?: string) => {
      console.log("currentModule: ", currentModule, "completedModule: ", completedModule);
      try {
            const response = await api.put(`/api/users/progress`, {
                  currentModule,
                  completedModule,
            });
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
            console.error("Error updating user progress:", error.response?.data || error.message);
            throw error;
      }
};

export const getUserProgress = async (userId: string) => {
      console.log("Fetching user progress...");

      try {
            const response = await api.get(`/api/users/progress/${userId}`);
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
            console.error("Error fetching user progress:", error.response?.data || error.message);
            throw error;
      }
};
