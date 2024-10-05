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

export const createChapter = async (data: ChapterData, moduleId: string) => {
      console.log(data, moduleId);
      try {
            const response = await api.post(`/api/module/${moduleId}/chapter`, {
                  chapter: data,
            });
            return response.data;
      } catch (error) {
            console.error("Error creating chapter:", error);
      }
};

export const updateChapter = async (id: string, data: ChapterData) => {
      try {
            const response = await api.put(`/api/chapter/${id}`, data);
            return response.data;
      } catch (error) {
            console.error("Error updating chapter:", error);
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

export const updateModule = async (id: string, data: ModuleData) => {
      try {
            const response = await api.put(`/api/module/${id}`, data);
            return response.data;
      } catch (error) {
            console.error("Error updating module:", error);
      }
};

export const deleteModule = async (id: string) => {
      try {
            const response = await api.delete(`/api/module/${id}`);
            return response.data;
      } catch (error) {
            console.error("Error deleting module:", error);
      }
};
