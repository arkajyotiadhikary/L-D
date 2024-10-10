// src/types/index.ts

export interface ModuleType {
      _id: string;
      title: string;
      description: string;
      // Add other relevant fields as needed
}

export interface ChapterType {
      _id: string;
      title: string;
      description: string;
      content: string;
      // Add other relevant fields as needed
}

export interface VideoType {
      _id: string;
      title: string;
      description: string;
      url: string;
      // Add other relevant fields as needed
}

export interface UserProgressType {
      userId: string;
      currentModule: string;
      completedModules: string[];
      // Add other relevant fields as needed
}
