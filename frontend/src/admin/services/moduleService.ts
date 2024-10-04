import axios from "axios";

// const API_BASE_URL = "https://lizmotor.onrender.com";
const API_BASE_URL = "http://localhost:8000";
// Create an instance of axios with base URL

const api = axios.create({
      baseURL: API_BASE_URL,
});

export const getAllModules = async () => {
      try {
            const response = await api.get(`/api/modules`);
            return response.data;
      } catch (error) {
            console.error("Error fetching all modules:", error);
      }
};

export const getModuleById = async (id: string) => {
      try {
            const response = await api.get(`/api/module/${id}`);
            return response.data;
      } catch (error) {
            console.error("Error fetching module by id:", error);
      }
};

export const getChaptersByModuleId = async (id: string) => {
      try {
            const response = await api.get(`/api/chapters/${id}`);
            return response.data;
      } catch (error) {
            console.error("Error fetching chapters by module id:", error);
      }
};

export const getChapterById = async (id: string) => {
      try {
            const response = await api.get(`/api/chapter/${id}`);
            console.log(response.data);
            return response.data;
      } catch (error) {
            console.error("Error fetching chapter by id:", error);
      }
};

export interface ModuleData {
      title?: string;
      description?: string;
      imgUrl?: string;
      chapters?: ChapterData[];
}

export interface ChapterData {
      title?: string;
      description?: string;
      content?: {
            type: "text" | "video";
            url: string;
      };
}

export const createModule = async (data: ModuleData) => {
      try {
            const response = await api.post(`/api/module/create`, data);
            return response.data;
      } catch (error) {
            console.error("Error creating module:", error);
      }
};
