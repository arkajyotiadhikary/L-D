import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

// Define Chapter, Module, and Assignment interfaces
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

// Define employee details interface
interface IEmployeeDetails {
      assignmentScores: IAssignmentScore[];
      moduleProgress: IModuleProgress[];
      progress: {
            completedModules: string[];
            currentModule: string | null;
      };
}

// User role types
type UserRole = "SUPER_ADMIN" | "MANAGER" | "EMPLOYEE" | "INSTRUCTOR";

// Updated IUser interface to include user roles and employee details
export interface IUser {
      _id: string;
      email: string;
      company: string;
      role: UserRole; // User role field
      moduleProgress?: IModuleProgress[]; // Optional for non-EMPLOYEEs
      assignmentScores?: IAssignmentScore[]; // Optional for non-EMPLOYEEs
      employeeDetails?: IEmployeeDetails; // Employee details for employees
      progress?: {
            completedModules: string[];
            currentModule: string | null;
      }; // Module progress information
}

// Define the state interface for Zustand
interface UserState {
      user: IUser | null;
      setUser: (user: IUser | null) => void;
      getUser: () => IUser | null;
      clearUser: () => void;
      isSuperAdmin: boolean;
      isManager: boolean;
      isEmployee: boolean;
}

// Custom localStorage handling
const localStoragePersist: PersistStorage<UserState> = {
      getItem: (name) => {
            try {
                  const value = localStorage.getItem(name);
                  return value ? JSON.parse(value) : null;
            } catch (error) {
                  console.error("Error getting item from localStorage", error);
                  return null;
            }
      },
      setItem: (name, value) => {
            try {
                  localStorage.setItem(name, JSON.stringify(value));
            } catch (error) {
                  console.error("Error setting item to localStorage", error);
            }
      },
      removeItem: (name) => {
            try {
                  localStorage.removeItem(name);
            } catch (error) {
                  console.error("Error removing item from localStorage", error);
            }
      },
};

// Zustand store with role-based logic and employee details
const useUserStore = create<UserState>()(
      persist(
            (set, get) => ({
                  user: null,
                  setUser: (user: IUser | null) =>
                        set({
                              user,
                              isSuperAdmin: user?.role === "SUPER_ADMIN",
                              isManager: user?.role === "MANAGER",
                              isEmployee: user?.role === "EMPLOYEE",
                        }),
                  getUser: () => get().user,
                  clearUser: () =>
                        set({
                              user: null,
                              isSuperAdmin: false,
                              isManager: false,
                              isEmployee: false,
                        }),
                  isSuperAdmin: false,
                  isManager: false,
                  isEmployee: false,
            }),
            {
                  name: "user-storage", // Local storage key
                  storage: localStoragePersist, // Custom storage for Zustand
            }
      )
);

export default useUserStore;
