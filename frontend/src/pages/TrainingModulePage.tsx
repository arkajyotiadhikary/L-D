/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import NavigationButton from "../components/NavigationButton";
import BackNavigationButton from "../components/BackNavigationButton"; // Import the new component
import ModuleContent from "../components/ModuleContent";
import ProgressBar from "../components/ProgressBar";
import VideoPlayer from "../components/VideoPlayer";
import { getCurrentModule } from "../services/moduleService"; // Update with the correct path
import { updateUserProgress, getUserProgress } from "../services/userService"; // Import the function to update user progress
import axios from "axios";

const TrainingModulePage: React.FC = () => {
      const LOCAL_STORAGE_KEY = "currentModuleId"; // Key to store the module ID in localStorage
      const [moduleData, setModuleData] = useState<any>(null); // Update the type according to your data structure
      const [loading, setLoading] = useState(true);
      const [next, setNext] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const [currentModuleId, setCurrentModuleId] = useState<string>(
            localStorage.getItem(LOCAL_STORAGE_KEY) || "66cecb8b389b58336dd4ce0a" // Default initial module ID
      );
      const [completedModules, setCompletedModules] = useState<string[]>([]);
      const [currentModule, setCurrentModule] = useState<any>(null); // Update the type according to your data structure

      const fetchModuleData = async (moduleId: string) => {
            try {
                  const data = await getCurrentModule({ moduleId }); // Pass the moduleId to the service
                  console.log("Module data:", data);
                  setModuleData(data);
                  setCurrentModule(data.currentModule);
            } catch (err) {
                  console.error("Error fetching module data:", err);
                  setError("Failed to fetch module data.");
            } finally {
                  setLoading(false);
            }
      };

      const fetchUserProgress = async () => {
            try {
                  const response = await getUserProgress();
                  console.log("User progress:", response);
                  const { completedModules, currentModule } = response;
                  setCompletedModules(completedModules);
                  setCurrentModule(currentModule);
            } catch (err) {
                  console.error("Error fetching user progress:", err);
                  setError("Failed to fetch user progress.");
            }
      };

      useEffect(() => {
            console.log("Fetching module data for module ID:", currentModuleId);

            if (currentModuleId) {
                  fetchModuleData(currentModuleId);
            }
      }, [currentModuleId]);

      useEffect(() => {
            fetchUserProgress();
      }, []);

      useEffect(() => {
            // Store the current module ID in localStorage whenever it changes
            localStorage.setItem(LOCAL_STORAGE_KEY, currentModuleId);
      }, [currentModuleId]);

      const handleNext = async () => {
            if (moduleData && moduleData.nextModuleId) {
                  const nextModuleId = moduleData.nextModuleId;

                  // Check if the current module is completed
                  if (completedModules.includes(currentModuleId)) {
                        setCurrentModuleId(nextModuleId);
                        setLoading(true);
                        setNext(true);
                  } else {
                        setNext(false);
                  }
            }
      };

      const handlePrevious = () => {
            if (moduleData && moduleData.prevModuleId) {
                  setCurrentModuleId(moduleData.prevModuleId);
                  setLoading(true);
            }
      };

      const updateProgress = async (moduleId: string) => {
            console.log("Updating progress for module ID:", moduleId);
            try {
                  await updateUserProgress(moduleId, currentModuleId);
                  fetchUserProgress(); // Refresh user progress after update

                  // Move to the next module
                  const nextModuleIndex = moduleData.currentModule.order;
                  console.log("Next module index:", nextModuleIndex);
                  if (nextModuleIndex !== -1 && nextModuleIndex < moduleData.totalModules) {
                        console.log("Next module ID:", moduleData.nextModuleId);
                        setCurrentModuleId(moduleData.nextModuleId);
                        setLoading(true);
                  }
            } catch (error) {
                  console.error("Error updating user progress:", error);
                  setError("Failed to update progress.");
            }
      };

      if (loading) return <div className="text-blue-500">Loading...</div>;
      if (error) return <div className="text-red-500">{error}</div>;

      if (!moduleData) return <div>No module data available</div>;

      const progress = currentModule ? currentModule.order : 0; // Assuming progress is total modules

      return (
            <div className="container mx-auto p-8 min-h-screen">
                  <div className="flex justify-between items-start">
                        <div className="w-2/3">
                              <ModuleContent
                                    title={`Module: ${currentModule.title}`}
                                    content={currentModule.content}
                              />
                        </div>
                        <div className="w-1/3">
                              <ProgressBar progress={progress} total={moduleData.totalModules} />
                              {currentModule && (
                                    <VideoPlayer
                                          videoId={currentModule.video.videoId ?? ""}
                                          videoSrc={currentModule.video.filePath ?? ""}
                                          onVideoEnded={() => updateProgress(currentModuleId)} // Pass the function to VideoPlayer
                                    />
                              )}
                        </div>
                  </div>
                  <div className="flex justify-between mt-4">
                        <BackNavigationButton
                              previousModule={moduleData.prevModuleTitle} // Ensure this value is available
                              handlePrevious={handlePrevious}
                              disabled={loading || !moduleData.prevModuleId}
                        />
                        <NavigationButton
                              nextModule={moduleData.nextModuleTitle} // Ensure this value is available
                              handleNext={handleNext}
                              disabled={loading || !moduleData.nextModuleId || next}
                        />
                  </div>
            </div>
      );
};

export default TrainingModulePage;
