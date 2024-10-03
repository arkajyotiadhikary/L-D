import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

interface IChapterProgress {
      chapterId: string;
      completed: boolean;
}

interface IModuleProgress {
      moduleId: string;
      completionPercentage: number;
      chapterProgress: IChapterProgress[];
      currentChapterId: string | null;
}

interface IAssignmentScore {
      assignmentId: string;
      score: number;
}

export interface IUser {
      email: string;
      password: string;
      company: string;
      moduleProgress: IModuleProgress[];
      assignmentScores: IAssignmentScore[];
      progress: {
            completedModules: string[];
            currentModule: string | null;
      };
}

// Define the user state interface
interface UserState {
      user: IUser | null;
      setUser: (user: IUser) => void;
      clearUser: () => void;
}

// Custom storage object for Zustand
const localStoragePersist: PersistStorage<UserState> = {
      getItem: (name) => {
            const value = localStorage.getItem(name);
            return value ? JSON.parse(value) : null;
      },
      setItem: (name, value) => {
            localStorage.setItem(name, JSON.stringify(value));
      },
      removeItem: (name) => {
            localStorage.removeItem(name);
      },
};

// Define the middleware-enhanced state creator with persist
const useUserStore = create<UserState>()(
      persist(
            (set) => ({
                  user: null,
                  setUser: (user: IUser) => set({ user }),
                  clearUser: () => set({ user: null }),
            }),
            {
                  name: "user-storage", // Local storage key
                  storage: localStoragePersist, // Custom storage for Zustand
            }
      )
);

export default useUserStore;
